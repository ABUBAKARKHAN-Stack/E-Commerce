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
}