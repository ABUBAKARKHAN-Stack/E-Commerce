import { Schema, model } from "mongoose";
import { IOrder, OrderStatus } from "../types/main.types";

const orderSchema = new Schema<IOrder>({
    orderId: {
        type: "String",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    cart: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: "Cart",
            required: true
        },
        products: [
            {
               name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
            }
        ]
    },
    total: {
        type: Number,
        required: true,
        default: 0

    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.PENDING
    }
})
const orderModel = model<IOrder>("Order", orderSchema);
export default orderModel;