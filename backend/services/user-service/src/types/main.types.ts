import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongoose";

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
    JwtUpdtedPayload,
    CreateUser,
    LoginUser,
    UpdateUser,
    UpdatePassword
}; 