"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.logoutUser = exports.updateUserPassword = exports.updateUser = exports.getUser = exports.resetPassword = exports.forgotPassword = exports.verifyUser = exports.loginUser = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const index_1 = require("../utils/index");
const index_2 = require("../helpers/index");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validator_1 = __importDefault(require("validator"));
//* Controller functions for user service
//? Create a new user
const createUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
        throw new index_1.ApiError(400, "All fields are required");
    }
    if (!validator_1.default.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })) {
        throw new index_1.ApiError(400, "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol");
    }
    if (!validator_1.default.isLength(name, { min: 3, max: 30 })) {
        throw new index_1.ApiError(400, "Name must be between 3 and 30 characters");
    }
    if (!validator_1.default.isEmail(email)) {
        throw new index_1.ApiError(400, "Invalid email");
    }
    if (!validator_1.default.isMobilePhone(phone, "en-PK")) {
        throw new index_1.ApiError(400, "Invalid phone number");
    }
    if (!validator_1.default.isLength(address, { min: 10, max: 100 })) {
        throw new index_1.ApiError(400, "Address must be between 10 and 100 characters");
    }
    const user = await user_model_1.userModel.create({
        name,
        email,
        password,
        phone,
        address
    });
    if (!user) {
        throw new index_1.ApiError(400, "User not created");
    }
    res
        .status(201)
        .json(new index_1.ApiResponse(201, "User Created Successfully", user));
});
exports.createUser = createUser;
//? Login a user
const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, phone, password } = req.body;
    if (!email && !phone) {
        throw new index_1.ApiError(400, "Email or phone is required");
    }
    if (!password) {
        throw new index_1.ApiError(400, "Password is required");
    }
    if (!validator_1.default.isEmail(email) && !validator_1.default.isMobilePhone(phone, "en-PK")) {
        throw new index_1.ApiError(400, "Invalid email or phone");
    }
    if (!validator_1.default.isLength(password, { min: 8 })) {
        throw new index_1.ApiError(400, "Password must be 8 char");
    }
    const user = await user_model_1.userModel.findOne({
        $or: [
            { email },
            { phone }
        ]
    });
    if (!user) {
        throw new index_1.ApiError(400, "User not found");
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new index_1.ApiError(400, "Invalid password");
    }
    if (!user.isVerified) {
        const token = (0, index_1.generateToken)({
            email: user.email,
        }, "15m");
        await (0, index_1.sendEmail)('E-Commerce Sign In Verification', user.email, 'Email Verification', (0, index_2.emailTemplate)("Email Verification", user.email, token));
        throw new index_1.ApiError(400, "Your account is not verified. A verification link has been sent to your email. Please verify your email to proceed.");
    }
    if (user.isActive) {
        throw new index_1.ApiError(400, "User already logged in");
    }
    const token = (0, index_1.generateToken)({
        userId: user._id,
    }, "1d");
    user.isActive = true;
    await user.save();
    res
        .status(200)
        .setHeader("Authorization", `Bearer ${token}`)
        .cookie("userToken", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
        secure: true
    })
        .json(new index_1.ApiResponse(200, "User logged in successfully"));
});
exports.loginUser = loginUser;
//? Verify a user
const verifyUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { email } = req.params;
    if (!email) {
        throw new index_1.ApiError(400, "email is required");
    }
    const { user } = res.locals;
    if (res.locals.user.email !== email) {
        throw new index_1.ApiError(400, "You are not authorized to verify this user");
    }
    if (user.isVerified) {
        throw new index_1.ApiError(400, "User already verified");
    }
    user.isVerified = true;
    await user.save();
    res
        .status(200)
        .json(new index_1.ApiResponse(200, "User verified successfully"));
});
exports.verifyUser = verifyUser;
//? Forgot password
const forgotPassword = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, phone } = req.body;
    if (!email && !phone) {
        throw new index_1.ApiError(400, "Email or phone is required");
    }
    console.log(email, phone);
    if (email && !validator_1.default.isEmail(email)) {
        throw new index_1.ApiError(400, "Invalid email");
    }
    if (phone && !validator_1.default.isMobilePhone(phone, "en-PK")) {
        throw new index_1.ApiError(400, "Invalid phone number");
    }
    const user = await user_model_1.userModel.findOne({
        $or: [
            { email },
            { phone }
        ]
    });
    if (!user) {
        throw new index_1.ApiError(400, "User not found");
    }
    const token = (0, index_1.generateToken)({
        email: user.email,
    }, '15m');
    await (0, index_1.sendEmail)('E-Commerce Reset Password', user.email, 'Reset Password', (0, index_2.emailTemplate)("Reset Password", user.email, token));
    res
        .status(200)
        .json(new index_1.ApiResponse(200, "Password reset link sent to your email"));
});
exports.forgotPassword = forgotPassword;
//? Reset password
const resetPassword = (0, express_async_handler_1.default)(async (req, res) => {
    const { password } = req.body;
    if (!password) {
        throw new index_1.ApiError(400, "Password is required");
    }
    if (!validator_1.default.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })) {
        throw new index_1.ApiError(400, "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol");
    }
    if (password) {
        const { user } = res.locals;
        if (!user) {
            throw new index_1.ApiError(400, "User not found");
        }
        const isSame = await user.comparePassword(password);
        if (isSame) {
            throw new index_1.ApiError(400, "New password cannot be same as old password");
        }
    }
    const { user } = res.locals;
    user.password = password;
    await user.save();
    res
        .status(200)
        .json(new index_1.ApiResponse(200, "Password reset successfully"));
});
exports.resetPassword = resetPassword;
//? Get a user
const getUser = (0, express_async_handler_1.default)(async (req, res) => {
    if (!res.locals.user) {
        throw new index_1.ApiError(400, "User not found");
    }
    const user = await user_model_1.userModel.findById(res.locals.user._id).select("-password");
    if (!user) {
        throw new index_1.ApiError(400, "User not found");
    }
    res
        .status(200)
        .json(new index_1.ApiResponse(200, "User fetched successfully", user));
});
exports.getUser = getUser;
//? Update a user
const updateUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, phone, address } = req.body;
    const userId = res.locals.user._id;
    if (!name && !email && !phone && !address) {
        throw new index_1.ApiError(400, "At least one field is required");
    }
    if (email) {
        await (0, index_2.existing)(email, userId);
    }
    if (phone) {
        await (0, index_2.existing)(phone, userId);
    }
    if (email) {
        if (!validator_1.default.isEmail(email)) {
            throw new index_1.ApiError(400, "Invalid email");
        }
    }
    if (phone) {
        if (!validator_1.default.isMobilePhone(phone, "en-PK")) {
            throw new index_1.ApiError(400, "Invalid phone number");
        }
    }
    const updatedUser = await user_model_1.userModel.findByIdAndUpdate(userId, {
        name,
        email,
        phone,
        address
    }, { new: true })
        .select("-password");
    if (!updatedUser) {
        throw new index_1.ApiError(400, "User not updated");
    }
    res
        .status(200)
        .json(new index_1.ApiResponse(200, "User updated successfully", updatedUser));
});
exports.updateUser = updateUser;
//? Update a user password
const updateUserPassword = (0, express_async_handler_1.default)(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new index_1.ApiError(400, "Old password and new password are required");
    }
    const user = await user_model_1.userModel.findById(res.locals.user._id);
    if (!user) {
        throw new index_1.ApiError(400, "User not found");
    }
    // 🛠️ Await the password comparison!
    const isPasswordValid = await user.comparePassword(oldPassword);
    if (!isPasswordValid) {
        throw new index_1.ApiError(400, "Old password is incorrect");
    }
    user.password = newPassword;
    // Save the updated password
    await user.save();
    res
        .status(200)
        .json(new index_1.ApiResponse(200, "User password updated successfully"));
});
exports.updateUserPassword = updateUserPassword;
//? Logout a user
const logoutUser = (0, express_async_handler_1.default)(async (req, res) => {
    if (!req.cookies.token) {
        throw new index_1.ApiError(400, "User is not logged in");
    }
    const user = await user_model_1.userModel.findById(res.locals.user._id);
    if (!user) {
        throw new index_1.ApiError(400, "User not found");
    }
    user.isActive = false;
    await user.save();
    res
        .status(200)
        .clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true
    })
        .json(new index_1.ApiResponse(200, "User logged out successfully"));
});
exports.logoutUser = logoutUser;
//? Delete a user
const deleteUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new index_1.ApiError(400, "User ID is required");
    }
    if (res.locals.user._id.toString() !== id) {
        throw new index_1.ApiError(403, "Forbidden: You can't delete this user");
    }
    const user = await user_model_1.userModel.findByIdAndDelete(res.locals.user._id);
    if (!user) {
        throw new index_1.ApiError(400, "User not found");
    }
    res
        .status(200)
        .clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: true
    })
        .json(new index_1.ApiResponse(200, "User deleted successfully"));
});
exports.deleteUser = deleteUser;
