import { ActivityType, OrderStatus, PaymentMethod, PaymentStatus } from "../types/main.types";
import orderModel from "../models/order.model";
import { customAlphabet } from "nanoid";
import { publishEvent } from "../utils/kafka";

const createOrder = async (orderData: any) => {
    try {

        const order = await orderModel.findOne({
            userId: orderData.user,
            status: OrderStatus.PENDING
        })

        if (order) {
            order.cart.products = orderData.products;
            order.cart.totalAmount = +orderData.totalAmount + 50;
            await order.save();
            console.log('Order Updated Successfully');
        } else {
            const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            const nanoid = customAlphabet(alphabet, 8);
            const orderId = nanoid(8)
            await orderModel.create({
                orderId,
                userId: orderData.user,
                cart: {
                    products: orderData.products,
                    totalAmount: +orderData.totalAmount + 50
                }
            });
            console.log('Order Created Successfully');
            await publishEvent('activity.user.order.placed', ActivityType.PLACE_ORDER, {
                userId: orderData.user,
                activityType: ActivityType.PLACE_ORDER,
                activityDescription: `Your order has been placed successfully.`,
                metaData: {
                    orderId,
                    totalAmount: +orderData.totalAmount + 50
                }
            });

        }


    } catch (error) {
        console.error("❌ Unexpected error in createOrder function:", error);
    }
};

const confirmOrder = async ({
    orderId,
    userId,
    intentId,
    paymentMethod,
    shippingAddress
}: { orderId: string, userId: string, intentId: string, paymentMethod: string, shippingAddress: string }) => {
    const parsedShippingAddress = JSON.parse(shippingAddress)
    const order = await orderModel.findOneAndUpdate({
        orderId,
    }, {
        status: OrderStatus.CONFIRMED,
        confirmedAt: new Date(),
        intentId,
        paymentStatus: PaymentStatus.PAID,
        paymentMethod,
        shippingAddress: parsedShippingAddress
    }, { new: true });
    await publishEvent("cart.clear", 'cleared-cart', { userId });
    await publishEvent("order.user.confirmed", 'user-confirmed', { userId, orderId }); //* For User
    await publishEvent('order.admin.confirmed', 'admin-confirmed', { orderId }); //* For Admin
    await publishEvent('activity.user.order.paid', ActivityType.PAID_ORDER, {
        userId,
        activityType: ActivityType.PAID_ORDER,
        activityDescription: `Your payment was successful. Thank you for your purchase!`,
        metaData: {
            orderId,
            totalAmount: order?.cart.totalAmount
        },
    });
}

export { createOrder, confirmOrder };
