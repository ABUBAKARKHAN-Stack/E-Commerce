import { JwtPayload } from "jsonwebtoken";
import { Document, Schema } from "mongoose";


enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
}


interface ICart {
    totalAmount: number;
    products: {productId: string; quantity: number}[];
}

interface IOrder extends Document {
    orderId: string;
    userId: string;
    cart: ICart;
    status: OrderStatus;
}

interface JwtUpdtedPayload extends JwtPayload {
    userId?: string;
    email?: string;
}


export {
    IOrder,
    OrderStatus,
    JwtUpdtedPayload
}