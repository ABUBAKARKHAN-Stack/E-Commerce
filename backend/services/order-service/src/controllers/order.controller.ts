import expressAsyncHandler from "express-async-handler";
import orderModel from "../models/order.model";
import { ApiResponse, ApiError, isOrderCancelable } from "../utils";
import { publishEvent } from '../utils/kafka'
import { Request, Response } from "express";
import { stripeClient } from "../config/stripe.config";
import { env } from "../config/env";
import Stripe from "stripe";
import { ActivityType, CompleteCheckoutBody, OrderStatus, PaymentMethod, PaymentStatus, ShippingMethod } from "../types/main.types";
import { confirmOrder, validateCancellable } from "../helpers/order.helper";



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
    const {
        totalAmountInUSD,
        paymentMethod,
        shippingAddress,
        shippingMethod
    }: CompleteCheckoutBody = req.body;
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

    let shippingPayload: { method: ShippingMethod, cost: number } = {
        cost: 6.99,
        method: ShippingMethod.STANDARD
    };

    if (shippingMethod) {
        switch (shippingMethod) {
            case ShippingMethod.EXPRESS:
                shippingPayload = {
                    cost: 9.99,
                    method: ShippingMethod.EXPRESS
                }
                break;
            case ShippingMethod.STANDARD:
                shippingPayload = {
                    cost: 6.99,
                    method: ShippingMethod.STANDARD
                }
                break;
            default:
                shippingPayload = {
                    cost: 6.99,
                    method: ShippingMethod.STANDARD
                }
                break;
        }
    }

    if (totalAmountInUSD >= 1000) {
        shippingPayload = {
            cost: 0,
            method: ShippingMethod.FREE
        }
    }

    const order = await orderModel.findOne({
        userId,
        status: OrderStatus.PENDING,
    })

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    if (paymentMethod === PaymentMethod.COD) {
        order.status = OrderStatus.CONFIRMED;
        order.paymentMethod = PaymentMethod.COD;
        order.shippingAddress = shippingAddress;
        order.shippingMethod = shippingPayload.method;
        order.shipping = shippingPayload.cost;
        order.confirmedAt = new Date();
        await order.save()
        await publishEvent("cart.clear", 'cleared-cart', { userId });
        await publishEvent("order.user.confirmed", 'user-confirmed', { userId, orderId: order.orderId }); //* For User
        await publishEvent('order.admin.confirmed', 'admin-confirmed', { orderId: order.orderId }); //* For Admin


        res
            .status(200)
            .json(new ApiResponse(200, "Order Placed Successfully", { orderId: order.orderId }));
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
            shippingAddress: JSON.stringify(shippingAddress),
            shippingPayload: JSON.stringify(shippingPayload)
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
            const shippingPayload = intent.metadata?.shippingPayload;
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
                shippingAddress,
                shippingPayload
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
        orderId,
        limit,
        page
    } = req.query;

    const orderQuery: any = {};
    if (status) orderQuery.status = status;
    if (orderId) orderQuery.orderId = { $regex: orderId, $options: "i" };

    const paginationQuery: any = {}
    if (limit) paginationQuery.limit = +limit || 5;
    if (page) paginationQuery.page = +page || 1;
    const skip = (paginationQuery.page - 1) * paginationQuery.limit;

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
        .limit(paginationQuery.limit)
        .skip(skip)
        .select('-userId -_id');

    const ordersCount = await orderModel.countDocuments(orderQuery)

    if (orders.length === 0) {
        res
            .status(200)
            .json(new ApiResponse(200, `You Don't have made any order`, []))
    }


    res
        .status(200)
        .json(new ApiResponse(200, "Orders Fetched", {
            orders,
            ordersCount
        }))
});

const getUserSingleOrder = expressAsyncHandler(async (req:Request, res:Response) => {
    const {orderId} = req.params;

    if (!orderId) {
        throw new ApiError(400, "Order Id is required")
    }

    const order = await orderModel.findOne({
        orderId
    })

    if (!order) {
        throw new ApiError(404, `No Order Found With Order Id ${orderId}`)
    }

    res
    .status(200)
    .json(new ApiResponse(200, "Order Details Fetched", order))
})

const cancelOrder = expressAsyncHandler(async (req: Request, res: Response) => {
    const { user } = res.locals;
    const { orderId } = req.body;

    if (!orderId) {
        throw new ApiError(400, "Order ID is required.");
    }

    const { userId } = user;

    const order = await orderModel.findOne({ userId, orderId });

    if (!order) {
        throw new ApiError(404, "Order not found.");
    }

    if (order.status === OrderStatus.CANCELLED) {
        throw new ApiError(409, "Order has already been cancelled.");
    }

    //*  Flags for easier logic
    const isCOD = order.paymentMethod === PaymentMethod.COD;
    const isStripe = order.paymentMethod === PaymentMethod.STRIPE;
    const isPending = order.status === OrderStatus.PENDING;
    const isConfirmed = order.status === OrderStatus.CONFIRMED;

    //* Helper: Cancel order as unpaid (no refund)
    const cancelAsUnpaid = async () => {
        order.status = OrderStatus.CANCELLED;
        order.paymentStatus = PaymentStatus.UNPAID;
        await order.save();
        res.status(200).json(new ApiResponse(200, 'Order has been cancelled'));
    };


    //* Cancel PENDING orders first — no need to check payment method

    if (isPending) {
        return await cancelAsUnpaid();
    }

    //* COD logic
    if (isCOD && isConfirmed) {
        validateCancellable({
            orderStatus: order.status,
            orderConfirmedAt: order.confirmedAt
        });
        return await cancelAsUnpaid();
    }

    //* Online Payment logic
    if (isStripe && isConfirmed) {
        if (!order.intentId) {
            throw new ApiError(400, "No payment intent found for this order.");
        }

        validateCancellable({
            orderStatus: order.status,
            orderConfirmedAt: order.confirmedAt
        });
        const refund = await stripeClient.refunds.create({
            payment_intent: order.intentId,
        });

        if (!refund) {
            throw new ApiError(400, "Refund not made.");
        }

        order.status = OrderStatus.CANCELLED;
        order.paymentStatus = PaymentStatus.REFUNDED;
        order.refund = {
            refundAmount: refund.amount / 100,
            refundAt: new Date(),
            stripeRefundId: refund.id,
        };

        await order.save();
        res.status(200).json(new ApiResponse(200, 'Order has been cancelled'));
        return
    }


    throw new ApiError(400, "Invalid order cancellation state.");
});




export {
    getPendingOrder,
    getConfirmedOrder,
    completeCheckout,
    stripeWebhookHandler,
    getUserOrders,
    getUserSingleOrder,
    cancelOrder
}