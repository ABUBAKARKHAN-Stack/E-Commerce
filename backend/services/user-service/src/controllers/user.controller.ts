import { userModel } from '../models/user.model'
import { Request, Response } from 'express'
import { CreateUser, IUser, LoginUser, UpdatePassword, UpdateUser } from '../types/main.types'
import { ApiError, ApiResponse, generateToken, sendEmail, publishEvent } from '../utils/index'
import { existing, emailTemplate } from '../helpers/index'
import asyncHandler from 'express-async-handler'
import validator from 'validator'


//* Controller functions for user service

//? Create a new user
const createUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password, phone, address }: CreateUser = req.body

    if (!name || !email || !password || !phone || !address) {
        throw new ApiError(400, "All fields are required")
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
    if (!validator.isLength(name, { min: 3, max: 30 })) {
        throw new ApiError(400, "Name must be between 3 and 30 characters")
    }
    if (!validator.isEmail(email)) {
        throw new ApiError(400, "Invalid email")
    }
    if (!validator.isMobilePhone(phone, "en-PK")) {
        throw new ApiError(400, "Invalid phone number")
    }
    if (!validator.isLength(address, { min: 10, max: 100 })) {
        throw new ApiError(400, "Address must be between 10 and 100 characters")
    }

    const user = await userModel.create({
        name,
        email,
        password,
        phone,
        address
    })

    if (!user) {
        throw new ApiError(400, "User not created")
    }
    try {
        await publishEvent<IUser>("user-creation", "user-created", user)
    } catch (error) {
        console.log("Error publishing event:", error);
        throw new ApiError(500, "Error publishing event");
    }
    res
        .status(201)
        .json(new ApiResponse(201, "User Created Successfully", user))
})

//? Login a user
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, phone, password }: LoginUser = req.body
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

    const user = await userModel.findOne({
        $or: [
            { email },
            { phone }
        ]
    })
    if (!user) {
        throw new ApiError(400, "User not found")
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid password")
    }

    if (!user.isVerified) {
        const token = generateToken({
            email: user.email,
        }, "15m")
        await sendEmail(
            'E-Commerce Sign In Verification',
            user.email,
            'Email Verification',
            emailTemplate("Email Verification", user.email, token)
        );
        throw new ApiError(400, "Your account is not verified. A verification link has been sent to your email. Please verify your email to proceed.");
    }


    if (user.isActive) {
        throw new ApiError(400, "User already logged in")
    }

    const token = generateToken({
        userId: user._id,
    }, "1d")

    user.isActive = true
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
        .json(new ApiResponse(200, "User logged in successfully"))
}
)

//? Verify a user
const verifyUser = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.params;

    if (!email) {
        throw new ApiError(400, "email is required")
    }
    const { user } = res.locals;
    if (res.locals.user.email !== email) {
        throw new ApiError(400, "You are not authorized to verify this user")
    }

    if (user.isVerified) {
        throw new ApiError(400, "User already verified")
    }

    user.isVerified = true;
    await user.save()

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
    console.log(email, phone);


    if (email && !validator.isEmail(email)) {
        throw new ApiError(400, "Invalid email")

    }

    if (phone && !validator.isMobilePhone(phone, "en-PK")) {
        throw new ApiError(400, "Invalid phone number")
    }

    const user = await userModel.findOne({
        $or: [
            { email },
            { phone }
        ]
    })
    if (!user) {
        throw new ApiError(400, "User not found")
    }
    const token = generateToken({
        email: user.email,
    }, '15m')
    await sendEmail(
        'E-Commerce Reset Password',
        user.email,
        'Reset Password',
        emailTemplate("Reset Password", user.email, token)
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

    if (password) {
        const { user } = res.locals
        if (!user) {
            throw new ApiError(400, "User not found")
        }
        const isSame = await user.comparePassword(password)
        if (isSame) {
            throw new ApiError(400, "New password cannot be same as old password")
        }
    }

    const { user } = res.locals;
    user.password = password;
    await user.save()
    res
        .status(200)
        .json(new ApiResponse(200, "Password reset successfully"))
})

//? Get a user
const getUser = asyncHandler(async (req: Request, res: Response) => {

    if (!res.locals.user) {
        throw new ApiError(400, "User not found")
    }

    const user = await userModel.findById(res.locals.user._id).select("-password")
    if (!user) {
        throw new ApiError(400, "User not found")
    }
    res
        .status(200)
        .json(new ApiResponse(200, "User fetched successfully", user))

})

//? Update a user
const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, phone, address }: UpdateUser = req.body
    const userId = res.locals.user._id;
    if (!name && !email && !phone && !address) {
        throw new ApiError(400, "At least one field is required")
    }

    if (email) {
        await existing(email, userId)
    }
    if (phone) {
        await existing(phone, userId)
    }

    if (email) {
        if (!validator.isEmail(email)) {
            throw new ApiError(400, "Invalid email")
        }
    }

    if (phone) {
        if (!validator.isMobilePhone(phone, "en-PK")) {
            throw new ApiError(400, "Invalid phone number")
        }
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, {
        name,
        email,
        phone,
        address
    }, { new: true })
        .select("-password")

    if (!updatedUser) {
        throw new ApiError(400, "User not updated")
    }
    res
        .status(200)
        .json(new ApiResponse(200, "User updated successfully", updatedUser))
})

//? Update a user password
const updateUserPassword = asyncHandler(async (req: Request, res: Response) => {
    const { oldPassword, newPassword }: UpdatePassword = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Old password and new password are required");
    }

    const user = await userModel.findById(res.locals.user._id);
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    // 🛠️ Await the password comparison!
    const isPasswordValid = await user.comparePassword(oldPassword);
    if (!isPasswordValid) {
        throw new ApiError(400, "Old password is incorrect");
    }

    user.password = newPassword;

    // Save the updated password
    await user.save();

    res
        .status(200)
        .json(new ApiResponse(200, "User password updated successfully"));
});


//? Logout a user
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    if (!req.cookies.userToken) {
        throw new ApiError(400, "User is not logged in");
    }
    const user = await userModel.findById(res.locals.user._id)
    if (!user) {
        throw new ApiError(400, "User not found");
    }
    user.isActive = false
    await user.save()
    res
        .status(200)
        .clearCookie("userToken", {
            httpOnly: true,
            sameSite: "none",
            secure: true
        })
        .json(new ApiResponse(200, "User logged out successfully"))
})

//? Delete a user
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        throw new ApiError(400, "User ID is required")
    }
    if (res.locals.user._id.toString() !== id) {
        throw new ApiError(403, "Forbidden: You can't delete this user");
    }

    const user = await userModel.findByIdAndDelete(res.locals.user._id)
    if (!user) {
        throw new ApiError(400, "User not found")
    }
    try {
        await publishEvent<IUser>("user-deletion" , "user-deleted" , user)
    } catch (error) {
          console.log("Error publishing event:", error);
          throw new ApiError(500, "Error publishing event");   
    }
    res
        .status(200)
        .clearCookie("userToken", {
            httpOnly: true,
            sameSite: "strict",
            secure: true
        })
        .json(new ApiResponse(200, "User deleted successfully"))
})


export {
    createUser,
    loginUser,
    verifyUser,
    forgotPassword,
    resetPassword,
    getUser,
    updateUser,
    updateUserPassword,
    logoutUser,
    deleteUser
}