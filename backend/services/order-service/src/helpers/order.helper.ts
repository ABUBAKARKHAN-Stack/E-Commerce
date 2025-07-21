import { OrderStatus } from "../types/main.types";
import orderModel from "../models/order.model";
import { customAlphabet } from "nanoid";
import { publishEvent } from "../utils";

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
            console.log(orderData, orderId);
            const order = await orderModel.create({
                orderId,
                userId: orderData.user,
                cart: {
                    products: orderData.products,
                    totalAmount: +orderData.totalAmount + 50
                }
            });
            console.log(order, 'Order Created Successfully');
        }


    } catch (error) {
        console.error("❌ Unexpected error in createOrder function:", error);
    }
};

export { createOrder };
