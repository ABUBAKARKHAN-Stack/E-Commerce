import { JwtPayload } from "jsonwebtoken";
import mongoose, { Document } from "mongoose";



interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    isVerified: boolean;
    wishlist: string[]
    role: string;
    comparePassword: (password: string) => Promise<boolean>;
    hashedPassword: (password: string) => Promise<string>;
}

interface ICartProduct {
    productId: string;
    price: number;
    quantity: number;
}

interface ICart extends Document {
    user: mongoose.Schema.Types.ObjectId;
    products: ICartProduct[];
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

enum ActivityType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    REGISTER = "REGISTER",

    UPDATE_PROFILE = "UPDATE_PROFILE",
    CHANGE_PASSWORD = "CHANGE_PASSWORD",
    VERIFY_ACCOUNT = "VERIFY_ACCOUNT",
    RESET_PASSWORD = "RESET_PASSWORD",
}

export {
    IUser,
    ICart,
    ICartProduct,
    JwtUpdtedPayload,
    CreateUser,
    LoginUser,
    UpdateUser,
    UpdatePassword,
    ActivityType

}; 