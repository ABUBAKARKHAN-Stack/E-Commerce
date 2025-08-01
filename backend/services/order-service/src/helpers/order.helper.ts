import { ActivityType, OrderStatus, PaymentMethod, PaymentStatus } from "../types/main.types";
import orderModel from "../models/order.model";
import { customAlphabet } from "nanoid";
import { publishEvent } from "../utils/kafka";
import { ApiError, isOrderCancelable } from "../utils";

const createOrder = async (orderData: any) => {
    try {

        const order = await orderModel.findOne({
            userId: orderData.user,
            status: OrderStatus.PENDING
        })



        if (order) {
            order.cart.products = orderData.products;
            order.cart.totalAmount = +orderData.totalAmount;
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
                    totalAmount: +orderData.totalAmount
                }
            });
            console.log('Order Created Successfully');
            await publishEvent('activity.user.order.placed', ActivityType.PLACE_ORDER, {
                userId: orderData.user,
                activityType: ActivityType.PLACE_ORDER,
                activityDescription: `Your order has been placed successfully.`,
                metaData: {
                    orderId,
                    totalAmount: +orderData.totalAmount
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
    shippingAddress,
    shippingPayload
}: {
    orderId: string,
    userId: string,
    intentId: string,
    paymentMethod: string,
    shippingAddress: string,
    shippingPayload?: string;
}) => {
    const parsedShippingAddress = JSON.parse(shippingAddress);
    const parsedShippingPayload = shippingPayload ? JSON.parse(shippingPayload) : null;


    const order = await orderModel.findOneAndUpdate({
        orderId,
    }, {
        status: OrderStatus.CONFIRMED,
        confirmedAt: new Date(),
        intentId,
        paymentStatus: PaymentStatus.PAID,
        paymentMethod,
        shippingAddress: parsedShippingAddress,
        shippingMethod: parsedShippingPayload.method,
        shipping: parsedShippingPayload.cost,
        $inc: {
            "cart.totalAmount": parsedShippingPayload.cost
        },
        deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
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

const validateCancellable = ({
    orderStatus,
    orderConfirmedAt
}: { orderStatus: string; orderConfirmedAt: Date }) => {
    const cancellable = isOrderCancelable(orderStatus, orderConfirmedAt);
    if (!cancellable) {
        throw new ApiError(403, "Cancellation window has expired. This order cannot be cancelled.");
    }
};

export {
    createOrder,
    confirmOrder,
    validateCancellable
};
