import expressAsyncHandler from "express-async-handler";
import orderModel from "../models/order.model";
import { ApiResponse, ApiError } from "../utils";
import { publishEvent } from '../utils/kafka'
import { Request, Response } from "express";
import { stripeClient } from "../config/stripe.config";
import { env } from "../config/env";
import Stripe from "stripe";
import { OrderStatus } from "../types/main.types";



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
})

const completeCheckout = expressAsyncHandler(async (req: Request, res: Response) => {
    const { totalAmountInUSD } = req.body;
    const { userId } = res.locals.user;


    if (typeof totalAmountInUSD !== 'number' || totalAmountInUSD <= 0) {
        throw new ApiError(400, 'Invalid total amount');
    }

    const order = await orderModel.findOne({
        userId,
        status: OrderStatus.PENDING
    })

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    const paymentIntent = await stripeClient.paymentIntents.create({
        amount: Math.round(totalAmountInUSD * 100),
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        metadata: {
            orderId: order.orderId,
            userId: order.userId
        }
    })

    res
        .status(200)
        .json(new ApiResponse(200, 'Payment Intent Created', { clientSecret: paymentIntent.client_secret, orderId: order.orderId }))
})



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
            if (!orderId || !userId) {
                console.error("Missing metadata in paymentIntent");
                res
                    .status(400)
                    .send("Missing metadata");
                return;
            }
            await orderModel.findOneAndUpdate({
                orderId,
            }, {
                status: OrderStatus.CONFIRMED, confirmedAt: new Date(),
            }, { new: true });
            await publishEvent("cart.clear", 'cleared-cart', { userId });
            await publishEvent("order.user.confirmed", 'user-confirmed', { userId, orderId }); //* For User
            await publishEvent('order.admin.confirmed', 'admin-confirmed', { orderId }); //* For Admin
            break;
        case 'payment_intent.created':
            console.log("Payment intent created");
            break;
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
});


const getUserOrders = expressAsyncHandler(async (req: Request, res: Response) => {
    const { user } = res.locals;
    if (!user) {
        throw new ApiError(401, "User not Logged In")
    }
    const { userId } = user;

    const orders = await orderModel.find({
        userId
    }).select('-userId -_id');

    if (orders.length === 0) {
        res
            .status(200)
            .json(new ApiResponse(200, `You Don't have made any order`, []))
    }


    res
        .status(200)
        .json(new ApiResponse(200, "Orders Fetched", orders))
})


export { 
    getPendingOrder,
    getConfirmedOrder,
    completeCheckout,
    stripeWebhookHandler,
    getUserOrders
}