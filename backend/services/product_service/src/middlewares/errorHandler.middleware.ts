import { Request, Response, NextFunction } from "express";
import { UploadApiErrorResponse } from "cloudinary";
import { ApiError } from "../utils"; // Assuming this is a custom error class
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

const errorHandler = (err: Error | UploadApiErrorResponse, req: Request, res: Response, next: NextFunction): void => {

    // Handle custom API errors
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            error: err.error || undefined,
        });
        return;
    }

    if (err instanceof JsonWebTokenError) {
        res
            .status(401)
            .json(new ApiError(401, "Invalid token"));
        return;
    }

    if (err instanceof TokenExpiredError) {
        res
            .status(401)
            .json(new ApiError(401, "Token expired"));
        return;
    }


    // Default error handling
    res
        .status(500)
        .json({
            statusCode: 500,
            message: err.message || "Internal Server Error",
            stack: process.env.NODE_ENV === "development" ? err.stack : err.stack,
        });
};

export default errorHandler;
