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

export interface  AdminUpdatedJwtPayload extends JwtPayload {
    adminId: string;
    role: string;
}


export interface IResetpasswordQueryParams { 
    queryParameters: object | null;
}
 

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    quantity: number;
}

