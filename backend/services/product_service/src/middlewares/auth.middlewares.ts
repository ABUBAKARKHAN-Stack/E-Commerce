import { env } from '../config/env';
import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils';
import { JwtUpdatedPayload } from '../types/main.types';

const userAuth = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!env.JWT_SECRET) {
        throw new ApiError(500, "JWT_SECRET is not defined");
    }
    const token = req.cookies.userToken;
    if (!token) {
        throw new ApiError(401, "Unauthorized: User not authenticated");
    }
    const decodedToken = jwt.verify(token, env.JWT_SECRET) as JwtUpdatedPayload;
    if (!decodedToken) {
        throw new ApiError(401, "Invalid token");
    }
    res.locals.user = decodedToken;
    next();
})

const adminAuth = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!env.JWT_SECRET) {
        throw new ApiError(500, "JWT_SECRET is not defined");
    }
    const token = req.cookies.adminToken;
    if (!token) {
        throw new ApiError(401, "Unauthorized: Admin not authenticated");
    }
    const decodedToken = jwt.verify(token, env.JWT_SECRET) as JwtUpdatedPayload;
    if (!decodedToken) {
        throw new ApiError(401, "Invalid token");
    }
    res.locals.admin = decodedToken;
    next();
})

export { userAuth, adminAuth };