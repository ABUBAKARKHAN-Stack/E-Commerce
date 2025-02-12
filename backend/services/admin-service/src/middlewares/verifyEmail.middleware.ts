import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { adminModel } from '../models/admin.model'
import asyncHandler from 'express-async-handler'
import { JwtUpdtedPayload } from '../types/main.types'
import { env } from '../config/env'

export const verifyEmailMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    if (!token) {
        throw new ApiError(400, "Token is required")
    }
    if (!env.JWT_SECRET) {
        throw new ApiError(500, "JWT secret is not configured");
    }
    const decodedToken = jwt.verify(token, env.JWT_SECRET) as JwtUpdtedPayload
    const admin = await adminModel.findOne({
        email: decodedToken.email
    })
    if (!admin) {
        throw new ApiError(400, "Admin not found")
    }
    res.locals.admin = admin;
    next();
})