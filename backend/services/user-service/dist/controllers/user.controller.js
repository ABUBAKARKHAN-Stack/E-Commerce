"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const index_1 = require("../utils/index");
const mongodb_1 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
        return res
            .status(400)
            .json(new index_1.ApiError(400, "All fields are required"));
    }
    try {
        const user = await user_model_1.userModel.create({
            name,
            email,
            password,
            phone,
            address
        });
        if (!user) {
            return res
                .status(400)
                .json(new index_1.ApiError(400, "User not created"));
        }
        return res
            .status(201)
            .json(new index_1.ApiResponse(201, "User Created Successfully", user));
    }
    catch (error) {
        if (error instanceof mongodb_1.MongoError && error.code === 11000) {
            return res
                .status(400)
                .json(new index_1.ApiError(400, "User already exists. Please try different email or phone number"));
        }
        return res
            .status(500)
            .json(new index_1.ApiError(500, "Internal Server Error", error));
    }
};
exports.createUser = createUser;
const loginUser = async (req, res) => {
    const { email, phone, password } = req.body;
    if (!email && !phone) {
        return res
            .status(400)
            .json(new index_1.ApiError(400, "Email or Phone is required"));
    }
    if (!password) {
        return res
            .status(400)
            .json(new index_1.ApiError(400, "Password is required"));
    }
    try {
        const user = await user_model_1.userModel.findOne({
            $or: [
                { email },
                { phone }
            ]
        });
        if (!user) {
            return res
                .status(400)
                .json(new index_1.ApiError(400, "User not found"));
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(400)
                .json(new index_1.ApiError(400, "Invalid Password"));
        }
        const token = (0, index_1.generateToken)({
            userId: user._id,
        }, "1d");
        if (!token) {
            return res
                .status(400)
                .json(new index_1.ApiError(400, "Token not generated"));
        }
        // if (!user.isVerified) {
        //     return res
        //         .status(400)
        //         .json(new ApiError(400, "A verification link has been sent to your email. Please verify your account"))
        // }
        return res
            .status(200)
            .cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
            secure: true
        })
            .json(new index_1.ApiResponse(200, "User logged in successfully"));
    }
    catch (error) {
        return res
            .status(500)
            .json(new index_1.ApiError(500, "Internal Server Error", error));
    }
};
exports.loginUser = loginUser;
const logoutUser = async (req, res) => {
    try {
        res
            .status(200)
            .clearCookie("token", {
            httpOnly: true,
            sameSite: "none",
            secure: true
        })
            .json(new index_1.ApiResponse(200, "User logged out successfully"));
    }
    catch (error) {
        return res
            .status(500)
            .json(new index_1.ApiError(500, "Internal Server Error", error));
    }
};
exports.logoutUser = logoutUser;
