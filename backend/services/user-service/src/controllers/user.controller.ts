import { userModel } from '../models/user.model'
import { Request, Response } from 'express'
import { User } from '../types/user.types'
import { ApiError, ApiResponse, generateToken } from '../utils/index'
import { MongoError } from 'mongodb'
import bcrypt from 'bcrypt'

const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password, phone, address }: User = req.body
    if (!name || !email || !password || !phone || !address) {
        return res
            .status(400)
            .json(new ApiError(400, "All fields are required"))
    }

    try {
        const user = await userModel.create({
            name,
            email,
            password,
            phone,
            address
        })

        if (!user) {
            return res
                .status(400)
                .json(new ApiError(400, "User not created"))
        }

        return res
            .status(201)
            .json(new ApiResponse(201, "User Created Successfully", user))

    } catch (error) {
        if (error instanceof MongoError && error.code === 11000) {
            return res
                .status(400)
                .json(new ApiError(400, "User already exists. Please try different email or phone number"))
        }
        return res
            .status(500)
            .json(new ApiError(500, "Internal Server Error", error))
    }

}

const loginUser = async (req: Request, res: Response) => {
    const { email, phone, password } = req.body
    if (!email && !phone) {
        return res
            .status(400)
            .json(new ApiError(400, "Email or Phone is required"))
    }
    if (!password) {
        return res
            .status(400)
            .json(new ApiError(400, "Password is required"))
    }
    try {
        const user = await userModel.findOne({
            $or: [
                { email },
                { phone }
            ]
        })
        if (!user) {
            return res
                .status(400)
                .json(new ApiError(400, "User not found"))
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res
                .status(400)
                .json(new ApiError(400, "Invalid Password"))
        }

        const token = generateToken({
            userId: user._id,
        }, "1d")

        if (!token) {
            return res
                .status(400)
                .json(new ApiError(400, "Token not generated"))
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
            .json(new ApiResponse(200, "User logged in successfully"))

    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, "Internal Server Error", error))
    }
}

const logoutUser = async (req: Request, res: Response) => {
    try {
        res
            .status(200)
            .clearCookie("token", {
                httpOnly: true,
                sameSite: "none",
                secure: true
            })
            .json(new ApiResponse(200, "User logged out successfully"))
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, "Internal Server Error", error))
    }
}

export {
    createUser,
    loginUser,
    logoutUser
}