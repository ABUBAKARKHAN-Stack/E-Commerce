import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { userModel } from '../models/user.model'
import asyncHandler from 'express-async-handler'
import { JwtUpdtedPayload } from '../types/main.types'

export const verifyEmailMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    if (!token) {
        throw new ApiError(400, "Token is required")
    }
    if (!process.env.JWT_SECRET) {
        throw new ApiError(500, "JWT secret is not configured");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtUpdtedPayload
    const user = await userModel.findOne({
        email: decodedToken.email
    })
    if (!user) {
        throw new ApiError(400, "User not found")
    }
    res.locals.user = user;
    next();
})