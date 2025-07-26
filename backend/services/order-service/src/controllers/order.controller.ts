import expressAsyncHandler from "express-async-handler";
import orderModel from "../models/order.model";
import { ApiResponse, ApiError, isOrderCancelable } from "../utils";
import { publishEvent } from '../utils/kafka'
import { Request, Response } from "express";
import { stripeClient } from "../config/stripe.config";
import { env } from "../config/env";
import Stripe from "stripe";
import { ActivityType, CompleteCheckoutBody, OrderStatus, PaymentMethod, PaymentStatus } from "../types/main.types";
import { confirmOrder } from "../helpers/order.helper";



const getPendingOrder = expressAsyncHandler(async (req: Request, res: Response) => {
    const { userId } = res.locals.user;

    const order = await orderModel.findOne({ userId, status: OrderStatus.PENDING }).lean();
    if (!order) {
        throw new ApiError(404, "Order not found");
    }
    res
        .status(200)
        .json(new ApiResponse(200, "Order fetched successfully", order));
});

const getConfirmedOrder = expressAsyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.query;
    const userId = res.locals.user.userId;


    if (!orderId) {
        throw new ApiError(400, 'Order ID is required');
    }


    const order = await orderModel.findOne({
        orderId,
        status: OrderStatus.CONFIRMED
    }).lean();


    if (!order) {
        throw new ApiError(404, 'No confirmed order found with the provided ID');
    }



    if (order.userId !== userId) {
        throw new ApiError(403, "You're not allowed to view this order");
    }
    res
        .status(200)
        .json(new ApiResponse(200, 'Order fetched successfully', order));
});


const completeCheckout = expressAsyncHandler(async (req: Request, res: Response) => {
    const { totalAmountInUSD, paymentMethod, shippingAddress }: CompleteCheckoutBody = req.body;
    const { userId } = res.locals.user;


    if (typeof totalAmountInUSD !== 'number' || totalAmountInUSD <= 0) {
        throw new ApiError(400, 'Invalid total amount');
    }

    if (!paymentMethod) {
        throw new ApiError(400, "Payment Method is required")
    }

    if (!shippingAddress) {
        throw new ApiError(400, "Shipping Address Must Required")
    }

    if (
        !shippingAddress.fullName ||
        !shippingAddress.phone ||
        !shippingAddress.email ||
        !shippingAddress.addressLine1 ||
        !shippingAddress.city ||
        !shippingAddress.state ||
        !shippingAddress.postalCode ||
        !shippingAddress.country
    ) {
        throw new ApiError(400, 'All required shipping address fields must be provided');
    }

    const order = await orderModel.findOne({
        userId,
        status: OrderStatus.PENDING
    })

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    if (paymentMethod === PaymentMethod.COD) {
        order.status = OrderStatus.CONFIRMED;
        order.paymentMethod = PaymentMethod.COD;
        order.shippingAddress = shippingAddress;
        order.confirmedAt = new Date();
        await order.save()

        res
            .status(200)
            .json(new ApiResponse(200, "Order Placed Successfully"));
        return;

    }

    const paymentIntent = await stripeClient.paymentIntents.create({
        amount: Math.round(totalAmountInUSD * 100),
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        metadata: {
            orderId: order.orderId,
            userId: order.userId,
            paymentMethod: PaymentMethod.STRIPE,
            shippingAddress: JSON.stringify(shippingAddress)
        }
    })

    res
        .status(200)
        .json(new ApiResponse(200, 'Payment Intent Created', { clientSecret: paymentIntent.client_secret, orderId: order.orderId }))
});


const stripeWebhookHandler = expressAsyncHandler(async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripeClient.webhooks.constructEvent(
            req.body,
            sig as string,
            env.STRIPE_WEBHOOK_SK!
        );
        console.log("Event Received", event.type);

    } catch (error) {
        console.error('Webhook Error:', (error as Error).message);
        res.status(400).send(`Webhook Error: ${(error as Error).message}`);
        return;
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const intent = event.data.object as Stripe.PaymentIntent;
            console.log("✅ Payment succeeded");
            const orderId = intent.metadata?.orderId;
            const userId = intent.metadata?.userId;
            const paymentMethod = intent.metadata?.paymentMethod;
            const shippingAddress = intent.metadata?.shippingAddress;
            const intentId = intent.id;
            if (!orderId || !userId || !paymentMethod || !shippingAddress) {
                res
                    .status(400)
                    .send("Missing metadata");
                return;
            }
            await confirmOrder({
                orderId,
                userId,
                intentId,
                paymentMethod,
                shippingAddress
            })
            break;
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
});


const getUserOrders = expressAsyncHandler(async (req: Request, res: Response) => {
    const { user } = res.locals;
    const {
        status,
        sortBy,
        orderId
    } = req.query;

    const orderQuery: any = {};
    if (status) orderQuery.status = status;
    if (orderId) orderQuery.orderId = { $regex: orderId, $options: "i" }

    const sortOptions: any = {};
    if (sortBy) {
        if (sortBy === 'newest') {
            sortOptions.createdAt = -1;
        } else if (sortBy === 'oldest') {
            sortOptions.createdAt = 1;
        }
    }

    if (!user) {
        throw new ApiError(401, "User not Logged In")
    }
    const { userId } = user;


    const orders = await orderModel.find({
        userId,
        ...orderQuery
    })
        .sort(sortOptions)
        .select('-userId -_id');

    if (orders.length === 0) {
        res
            .status(200)
            .json(new ApiResponse(200, `You Don't have made any order`, []))
    }


    res
        .status(200)
        .json(new ApiResponse(200, "Orders Fetched", orders))
});

const cancelOrder = expressAsyncHandler(async (req: Request, res: Response) => {
    const { user } = res.locals;
    const { orderId } = req.body;

    if (!orderId) {
        throw new ApiError(400, "Order ID is required.");
    }

    const { userId } = user;

    const order = await orderModel.findOne({
        userId,
        orderId
    })

    if (!order) {
        throw new ApiError(404, "Order not found.");
    }

    if (order.status === OrderStatus.CANCELLED) {
        throw new ApiError(409, "Order has already been cancelled.");
    }

    if (!order.intentId) {
        throw new ApiError(400, "No payment intent found for this order.");
    }


    if (order.status === OrderStatus.PENDING) {
        order.status = OrderStatus.CANCELLED;
        order.paymentStatus = PaymentStatus.UNPAID;
        await order.save()
        res
            .status(200)
            .json(new ApiResponse(200, 'Order has been cancelled'));
        return;
    } else if (order.status === OrderStatus.CONFIRMED) {
        const canCancelled = isOrderCancelable(order.status, order.confirmedAt);
        if (!canCancelled) {
            throw new ApiError(403, "Cancellation window has expired. This order cannot be cancelled.");
        }
        const refund = await stripeClient.refunds.create({
            payment_intent: order.intentId
        });

        if (!refund) {
            throw new ApiError(400, "Refund not Made")
        }
        order.status = OrderStatus.CANCELLED;
        order.paymentStatus = PaymentStatus.REFUNDED
        const refundAmount = +refund.amount / 100;
        order.refund = {
            refundAmount,
            refundAt: new Date(),
            stripeRefundId: refund.id,
        }

        await order.save()
    }

    res
        .status(200)
        .json(new ApiResponse(200, 'Order has been cancelled'));

})



export {
    getPendingOrder,
    getConfirmedOrder,
    completeCheckout,
    stripeWebhookHandler,
    getUserOrders,
    cancelOrder
}