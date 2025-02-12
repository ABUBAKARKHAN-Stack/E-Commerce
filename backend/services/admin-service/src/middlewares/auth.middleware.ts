import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/index';
import jwt from 'jsonwebtoken';
import { adminModel } from '../models/admin.model';
import { JwtUpdtedPayload } from '../types/main.types';
import asyncHandler from 'express-async-handler';
import { env } from '../config/env';



const authCheck = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    //! Check if JWT_SECRET is defined
    if (!env.JWT_SECRET) {
        throw new Error("❌ JWT_SECRET is missing from environment variables!");
    }

    //* Extract token from cookies or authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) throw new ApiError(401, "Unauthorized: No token provided");

    //* Verify and decode JWT
    const decodedToken = jwt.verify(token, env.JWT_SECRET) as JwtUpdtedPayload;
  
    //* Fetch Admin from DB
    const admin = await adminModel.findById(decodedToken.adminId);
    if (!admin) throw new ApiError(401, "Unauthorized: admin not found");

    //* Store Admin in response locals
    res.locals.admin = admin;
    next();

})

export default authCheck;
