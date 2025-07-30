import { JwtPayload } from "jwt-decode";

export interface IUser {
    _id: string;
    username: string;
    role: string;
    email: string;
    phone: string;
    address?: string;
}


export interface IAdmin {
    _id: string,
    username: string,
    email: string,
    phone: number,
    isActive: boolean,
    isVerified: boolean,
    role: string,
    totalSales: number,
    usersCount: [],
    products: [],
}

export interface UserUpdatedJwtPayload extends JwtPayload {
    userId: string;
    role: string;
}

export interface AdminUpdatedJwtPayload extends JwtPayload {
    adminId: string;
    role: string;
}


export interface IResetpasswordQueryParams {
    queryParameters: object | null;
}

export interface IReview {
    userId: string;
    review?: string;
    rating: number;
    createdAt: Date
}

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    thumbnails: string[];
    quantity: number;
    avgRating: number;
    totalReviews: number;
    reviews: IReview[]
}

export interface ICartedProduct extends IProduct {
    cartedProductQunatity: number
}


export const enum AdminProductLoading {
    ADD = "add",
    DELETE = "delete",
    EDIT = "edit",
    GET_ALL = "get-products",
    GET_ONE = "get-product"
}

export interface NavItem {
    label: string;
    href: string;
};

export interface ProductFilterParams {
    search: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    sortBy: string;
    limit: number;
    page: number
}

export interface ApiErrorType {
    status: number;
    message: string;
    error: object
}



export const enum OrderLoading {
    TRACK_ORDER_LOADING = 'track-order',
    GET_ALL_ORDERS = 'get-all-orders',
    CANCEL_ORDER = "cancel-order",
    DOWNLOAD_INVOICE= "download-invoice"
}

export enum ActivityType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    REGISTER = "REGISTER",


    UPDATE_PROFILE = "UPDATE_PROFILE",
    CHANGE_PASSWORD = "CHANGE_PASSWORD",
    VERIFY_ACCOUNT = "VERIFY_ACCOUNT",
    RESET_PASSWORD = "RESET_PASSWORD",


    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",

    ADD_TO_WISHLIST = "ADD_TO_WISHLIST",
    REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST",

    PLACE_ORDER = "PLACE_ORDER",
    CANCEL_ORDER = "CANCEL_ORDER",
    PAID_ORDER = "PAID_ORDER",

    WRITE_REVIEW = "WRITE_REVIEW",
    DELETE_REVIEW = "DELETE_REVIEW",

    VIEW_PRODUCT = "VIEW_PRODUCT",

}


export interface IActivity {
    userId: string;
    activityType: ActivityType;
    activityDescription: string;
    metaData?: Record<string, string | number>;
    createdAt: Date
}

export enum PaymentMethod {
    STRIPE = 'stripe',
    COD = 'cod',
}

export interface IShippingAddress {
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
export type CompleteCheckoutBody = {
    totalAmountInUSD: number;
    paymentMethod: string;
    shippingAddress: IShippingAddress;
    shippingMethod: string
}


export type CheckoutTabsType = "shipping-address" | "shipping-method" | "checkout-summary" | "payment"


export enum ShippingMethod {
    FREE = "FREE",
    STANDARD = "STANDARD",
    EXPRESS = "EXPRESS"
}

export interface IOrder {
    orderId: string;
    cart: {
        products: any[];
        totalAmount: number;
    };
    status: string;
    createdAt: string;
    confirmedAt?: string;
    paymentMethod?: PaymentMethod;
    refund?: {
        refundAmount?: number;
        refundAt?: string;
    };
    shipping?: number;
    paymentStatus: string
};


export enum PaymentStatus {
    PAID = "PAID",
    UNPAID = "UNPAID",
    REFUNDED = "REFUNDED"
}

export enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled",
}

export type OrderedProduct = {
    name: string;
    orderedProductQuantity: number;
    price: number;
    thumbnail?: string;
};