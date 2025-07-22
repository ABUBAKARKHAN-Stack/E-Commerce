import { Schema, model } from "mongoose";
import { IOrder, OrderStatus } from "../types/main.types";

const orderSchema = new Schema<IOrder>({
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
    cart: {
        products: [{
            productId: { type: String, required: true },
            quantity: { type: Number, required: true }
        }],
        totalAmount: { type: Number, required: true },
    },
    status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
    confirmedAt: { type: Date, default: null }
}, { timestamps: true })
const orderModel = model<IOrder>("Order", orderSchema);
export default orderModel;