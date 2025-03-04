import { JwtPayload } from "jsonwebtoken";
import mongoose, { Document } from "mongoose";

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    isVerified: boolean;
    role: string;
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
    username: string;
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
    username?: string;
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