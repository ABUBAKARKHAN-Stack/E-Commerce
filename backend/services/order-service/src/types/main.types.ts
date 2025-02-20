import { JwtPayload } from "jsonwebtoken";
import { Document, Schema } from "mongoose";


enum OrderStatus {
    PENDING = "pending",
    DELIVERED = "confirmed",
    CANCELLED = "cancelled",
}

interface Products {
    name:string;
    price:number;
    quantity:number
}

interface ICart {
    _id: Schema.Types.ObjectId;
    products: Products[];
}

interface IOrder extends Document {
    orderId: string;
    user: Schema.Types.ObjectId;
    cart: ICart;
    total: number;
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