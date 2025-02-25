import mongoose from "mongoose";
import { IUser } from "../types/main.types";
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/    
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        default: ""
     },
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    }


}, {
    timestamps: true
})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

userSchema.methods.comparePassword = async function (password: string) {
    const user = this as IUser;
    return await bcrypt.compare(password, user.password)
}

export const userModel = mongoose.model<IUser>("user", userSchema)