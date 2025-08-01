import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongoose";


enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled",
}

enum PaymentMethod {
    STRIPE = 'stripe',
    COD = 'cod',
}


interface ICart {
    totalAmount: number;
    products: { productId: string; quantity: number }[];
}

interface IShippingAddress {
    fullName: string;
    phone: string;
    email: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

interface IRefundInfo {
    refundAmount: number;
    refundAt: Date;
    stripeRefundId?: string;
}

enum PaymentStatus {
    PAID = "PAID",
    UNPAID = "UNPAID",
    REFUNDED = "REFUNDED"
}

enum ShippingMethod {
    FREE = "FREE",
    STANDARD = "STANDARD",
    EXPRESS = "EXPRESS"
}


interface IOrder extends Document {
    orderId: string;
    userId: string;
    cart: ICart;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    confirmedAt: Date;
    shipping: number;
    shippingMethod: ShippingMethod,
    shippingAddress: IShippingAddress;
    isDelivered: boolean;
    intentId: string;
    refund: IRefundInfo;
    paymentStatus: PaymentStatus;
    createdAt:Date;
    deliveryDate: Date
}

interface JwtUpdtedPayload extends JwtPayload {
    userId?: string;
    email?: string;
}

enum ActivityType {
    PLACE_ORDER = "PLACE_ORDER",
    CANCEL_ORDER = "CANCEL_ORDER",
    PAID_ORDER = "PAID_ORDER",
}

type CompleteCheckoutBody = {
    totalAmountInUSD: number;
    paymentMethod: string;
    shippingAddress: IShippingAddress;
    shippingMethod?: ShippingMethod;
    shipping?: number

}


export {
    IOrder,
    OrderStatus,
    JwtUpdtedPayload,
    ActivityType,
    PaymentMethod,
    PaymentStatus,
    ShippingMethod,
    CompleteCheckoutBody,
    IShippingAddress

}