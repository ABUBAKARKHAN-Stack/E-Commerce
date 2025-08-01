import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/index';
import jwt from 'jsonwebtoken';
import { JwtUpdtedPayload } from '../types/main.types';
import expressAsyncHandler from 'express-async-handler';
import { env } from '../config/env';

const userAuth = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    //! Check if JWT_SECRET is defined
    if (!env.JWT_SECRET) {
        throw new Error("❌ JWT_SECRET is missing from environment variables!");
    }

    //* Extract token from cookies or authorization header
    const token = req.cookies.userToken || req.headers.authorization?.split(" ")[1];
    if (!token) throw new ApiError(401, "Unauthorized: No token provided");

    //* Verify and decode JWT
    const decodedToken = jwt.verify(token, env.JWT_SECRET) as JwtUpdtedPayload;
    if (!decodedToken) throw new ApiError(401, "Invalid Token");

    res.locals.user = decodedToken;
    next();

})

const adminAuth = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //! Check if JWT_SECRET is defined
    if (!env.JWT_SECRET) {
        throw new Error("❌ JWT_SECRET is missing from environment variables!");
    }

    //* Extract admin token from cookies or authorization header
    const adminToken = req.cookies.adminToken || req.headers.authorization?.split(" ")[1];
    if (!adminToken) throw new ApiError(401, "Unauthorized: Admin not authenticated");

    //* Verify and decode JWT
    const decodedAdminToken = jwt.verify(adminToken, env.JWT_SECRET) as JwtUpdtedPayload;
    if (!decodedAdminToken) throw new ApiError(401, "Invalid token");


    res.locals.admin = decodedAdminToken;
    next()
})

export {
        adminAuth,
        userAuth
};
