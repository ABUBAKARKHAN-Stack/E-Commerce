import { Schema, model } from "mongoose";
import { IOrder, OrderStatus, PaymentMethod, PaymentStatus, ShippingMethod } from "../types/main.types";

const orderSchema = new Schema<IOrder>({
    orderId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    cart: {
        products: [{
            productId: { type: String, required: true },
            quantity: { type: Number, required: true }
        }],
        totalAmount: { type: Number, required: true },
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.PENDING
    },
    confirmedAt: {
        type: Date,
        default: null
    },
    intentId: {
        type: String,
        default: null
    },
    refund: {
        refundAmount: { type: Number, default: null },
        refundAt: { type: Date, default: null },
        stripeRefundId: { type: String, default: null },
    },
    paymentStatus: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.UNPAID
    },
    paymentMethod: {
        type: String,
        enum: Object.values(PaymentMethod),
        default: null
    },
    shippingAddress: {
        type: Object,
        default: null
    },
    shipping: {
        type: Number,
        default: null,
    },
    shippingMethod: {
        type: String,
        enum: Object.values(ShippingMethod),
        default: null
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveryDate: {
        type: Date,
        default: null
    }
}, { timestamps: true })
const orderModel = model<IOrder>("Order", orderSchema);
export default orderModel;