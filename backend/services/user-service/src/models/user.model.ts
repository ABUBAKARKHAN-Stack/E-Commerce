import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/main.types";
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema<IUser>({
    username: {
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
    role: {
        type: String,
        default: "user"
    },
    wishlist: [String],
    isVerified: {
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

export const userModel = mongoose.model<IUser>("User", userSchema)