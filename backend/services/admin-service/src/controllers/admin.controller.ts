import { adminModel } from '../models/admin.model'
import { Request, Response } from 'express'
import { CreateAdmin, LoginAdmin, UpdatePassword, UpdateAdmin } from '../types/main.types'
import { ApiError, ApiResponse, generateToken, sendEmail } from '../utils/index'
import { existing, emailTemplate } from '../helper/index'
import asyncHandler from 'express-async-handler'
import validator from 'validator'


//* Controller functions for Admin service

//? Create a new Admin
const createAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password, phone }: CreateAdmin = req.body;

    if (!username || !email || !password || !phone) {
        throw new ApiError(400, "All fields are required");
    }

    if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })) {
        throw new ApiError(400, "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol");
    }

    if (!validator.isLength(username, { min: 3, max: 30 })) {
        throw new ApiError(400, "Name must be between 3 and 30 characters");
    }

    if (!validator.isEmail(email)) {
        throw new ApiError(400, "Invalid email");
    }

    if (!validator.isMobilePhone(phone, "en-PK")) {
        throw new ApiError(400, "Invalid phone number");
    }


    const admin = await adminModel.createOne({
        username,
        email,
        password,
        phone,
    });

    if (!admin) {
        throw new ApiError(400, "Admin not created");
    }

    res
        .status(201)
        .json(new ApiResponse(201, "Admin Created Successfully", admin));
});

//? Login a Admin
const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { email, phone, password }: LoginAdmin = req.body

    if (!email && !phone) {
        throw new ApiError(400, "Email or phone is required")
    }
    if (!password) {
        throw new ApiError(400, "Password is required")
    }
    if (!validator.isEmail(email!) && !validator.isMobilePhone(phone!, "en-PK")) {
        throw new ApiError(400, "Invalid email or phone")
    }
    if (!validator.isLength(password, { min: 8 })) {
        throw new ApiError(400, "Password must be 8 char")
    }

    const admin = await adminModel.findOne({
        $or: [
            { email },
            { phone }
        ]
    })
    if (!admin) {
        throw new ApiError(400, "Admin not found")
    }

    const isPasswordValid = await admin.comparePassword(password)

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid password")
    }

    if (!admin.isVerified) {
        const token = generateToken({
            email: admin.email,
        }, "5m")
        await sendEmail(
            'E-Commerce Sign In Verification',
            admin.email,
            'Email Verification',
            emailTemplate("Email Verification", admin.email, token)
        );
        throw new ApiError(400, "Your account is not verified. A verification link has been sent to your email. Please verify your email to proceed.");
    }


    const token = generateToken({
        adminId: admin._id,
        role: admin.role
    }, "1d")

    await admin.save();


    res
        .status(200)
        .setHeader("Authorization", `Bearer ${token}`)
        .cookie("adminToken", token, {
            httpOnly: false,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
            secure: true
        })
        .json(new ApiResponse(200, "Admin logged in successfully", {
            adminToken: token
        }))
}
)

//? Verify a Admin
const verifyAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.params;

    if (!email) {
        throw new ApiError(400, "email is required")
    }
    const { admin } = res.locals;
    if (admin.email !== email) {
        throw new ApiError(400, "You are not authorized to verify this user")
    }

    if (admin.isVerified) {
        throw new ApiError(400, "User already verified")
    }

    admin.isVerified = true;
    await admin.save()

    res
        .status(200)
        .json(new ApiResponse(200, "User verified successfully"))
})


//? Forgot password
const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email, phone } = req.body;

    if (!email && !phone) {
        throw new ApiError(400, "Email or phone is required")
    }

    if (email && !validator.isEmail(email)) {
        throw new ApiError(400, "Invalid email")

    }

    if (phone && !validator.isMobilePhone(phone, "en-PK")) {
        throw new ApiError(400, "Invalid phone number")
    }

    const admin = await adminModel.findOne({
        $or: [
            { email },
            { phone }
        ]
    })
    if (!admin) {
        throw new ApiError(400, "Admin not found")
    }
    const token = generateToken({
        email: admin.email,
    }, '5m')
    await sendEmail(
        'E-Commerce Reset Password',
        admin.email,
        'Reset Password',
        emailTemplate("Reset Password", admin.email, token)
    );

    res
        .status(200)
        .json(new ApiResponse(200, "Password reset link sent to your email"))
})

//? Reset password
const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { password } = req.body;
    if (!password) {
        throw new ApiError(400, "Password is required")
    }
    if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })) {
        throw new ApiError(400, "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol")
    }
    const { admin } = res.locals;
    admin.password = password;
    await admin.save()
    res
        .status(200)
        .json(new ApiResponse(200, "Password reset successfully"))
})

//? Get a Admin
const getAdmin = asyncHandler(async (req: Request, res: Response) => {

    if (!res.locals.admin) {
        throw new ApiError(400, "Admin not found")
    }

    const admin = await adminModel.findById(res.locals.admin._id).select("-password")
    if (!admin) {
        throw new ApiError(400, "Admin not found")
    }
    res
        .status(200)
        .json(new ApiResponse(200, "Admin fetched successfully", admin))

})

//? Update a Admin
const updateAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, phone, address }: UpdateAdmin = req.body
    const adminId = res.locals.admin._id;
    if (!name && !email && !phone && !address) {
        throw new ApiError(400, "At least one field is required")
    }

    if (email) {
        await existing(email, adminId)
    }
    if (phone) {
        await existing(phone, adminId)
    }

    const updatedAdmin = await adminModel.findByIdAndUpdate(adminId, {
        name,
        email,
        phone,
        address
    }, { new: true })
        .select("-password")

    if (!updatedAdmin) {
        throw new ApiError(400, "Admin not updated")
    }
    res
        .status(200)
        .json(new ApiResponse(200, "Admin updated successfully", updatedAdmin))
})

//? Update a Admin password
const updateAdminPassword = asyncHandler(async (req: Request, res: Response) => {
    const { oldPassword, newPassword }: UpdatePassword = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Old password and new password are required");
    }

    const admin = await adminModel.findById(res.locals.admin._id);
    if (!admin) {
        throw new ApiError(400, "Admin not found");
    }

    // 🛠️ Await the password comparison!
    const isPasswordValid = await admin.comparePassword(oldPassword);
    if (!isPasswordValid) {
        throw new ApiError(400, "Old password is incorrect");
    }

    admin.password = newPassword;

    // Save the updated password
    await admin.save();

    res
        .status(200)
        .json(new ApiResponse(200, "Admin password updated successfully"));
});


//? Logout a Admin
const logoutAdmin = asyncHandler(async (req: Request, res: Response) => {
    if (!req.cookies.adminToken) {
        throw new ApiError(400, "Admin is not logged in");
    }
    const admin = await adminModel.findById(res.locals.admin._id)
    if (!admin) {
        throw new ApiError(400, "Admin not found");
    }
    res
        .status(200)
        .clearCookie("adminToken", {
            httpOnly: true,
            sameSite: "none",
            secure: true
        })
        .json(new ApiResponse(200, "Admin logged out successfully"))
})

//? Delete a Admin
const deleteAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        throw new ApiError(400, "Admin ID is required")
    }
    if (res.locals.admin._id.toString() !== id) {
        throw new ApiError(403, "Forbidden: You can't delete this Admin");
    }

    const admin = await adminModel.findByIdAndDelete(res.locals.admin._id)
    if (!admin) {
        throw new ApiError(400, "Admin not found")
    }
    res
        .status(200)
        .clearCookie("adminToken", {
            httpOnly: true,
            sameSite: "strict",
            secure: true
        })
        .json(new ApiResponse(200, "Admin deleted successfully"))
})


export {
    createAdmin,
    loginAdmin,
    verifyAdmin,
    forgotPassword,
    resetPassword,
    getAdmin,
    updateAdmin,
    updateAdminPassword,
    logoutAdmin,
    deleteAdmin
}