import { JwtPayload } from "jsonwebtoken";
import { Document, Model } from "mongoose";


interface IAdmin extends Document {
    username: string;
    email: string;
    password: string;
    phone: string;
    isVerified: boolean;
    totalSales: number;
    products: [];
    role: string;
    usersCount: [];
    comparePassword: (password: string) => Promise<boolean>;
}

interface AdminExtendedModel extends Model<IAdmin> {
    createOne: (adminData: CreateAdmin) => Promise<IAdmin>
}


interface JwtUpdtedPayload extends JwtPayload {
    adminId?: string;
    email?: string;
}

interface CreateAdmin {
    username: string;
    email: string;
    password: string;
    phone: string;
}

interface LoginAdmin {
    email?: string;
    phone?: string;
    password: string;
}

interface UpdateAdmin {
    name?: string;
    email?: string;
    phone?: string;
}

interface UpdatePassword {
    oldPassword: string;
    newPassword: string;
}

export {
    IAdmin,
    AdminExtendedModel,
    JwtUpdtedPayload,
    CreateAdmin,
    LoginAdmin,
    UpdateAdmin,
    UpdatePassword
}; 