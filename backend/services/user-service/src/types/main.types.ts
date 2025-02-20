import { JwtPayload } from "jsonwebtoken";
import mongoose, { Document } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    isVerified: boolean;
    isActive: boolean;
    comparePassword: (password: string) => Promise<boolean>;
    hashedPassword: (password: string) => Promise<string>;
}

interface ICartProduct extends Document {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    thumbnail: string;
}

interface ICart extends Document {
    user: mongoose.Schema.Types.ObjectId;
    products: ICartProduct[],
    totalAmount: number;
}

interface JwtUpdtedPayload extends JwtPayload {
    userId?: string;
    email?: string;
}

interface CreateUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
}

interface LoginUser {
    email?: string;
    phone?: string;
    password: string;
}

interface UpdateUser {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
}

interface UpdatePassword {
    oldPassword: string;
    newPassword: string;
}

export {
    IUser,
    ICart,
    ICartProduct,
    JwtUpdtedPayload,
    CreateUser,
    LoginUser,
    UpdateUser,
    UpdatePassword
}; 