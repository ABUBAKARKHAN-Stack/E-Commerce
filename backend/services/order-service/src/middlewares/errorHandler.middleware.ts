import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/index";
import { env } from "../config/env";
import { JsonWebTokenError, TokenExpiredError, } from "jsonwebtoken";
import {
    StripeRefundError
} from '../types/errors.types'


function isStripeRefundError(err: any): err is StripeRefundError {
    return (
        err &&
        typeof err === 'object' &&
        'error' in err &&
        typeof err.error === 'object' &&
        typeof err.error.type === 'string' &&
        typeof err.error.message === 'string'
    );
}


const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    //* Handle custom ApiError
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            error: err.error || null,
        });
        return;
    }

    //* Handle JWT errors
    if (err instanceof TokenExpiredError) {
        res.status(401).json(new ApiError(401, "Unauthorized: Token expired"));
        return;
    }

    if (err instanceof JsonWebTokenError) {
        res.status(401).json(new ApiError(401, "Unauthorized: Invalid token"));
        return;
    }

    if (isStripeRefundError(err)) {
        res
            .status(400)
            .json(new ApiError(400, err.error.message, err))
        return;
    }

    // Handle all other errors
    res.status(500).json(new ApiError(500, err.message || "Internal Server Error", env.NODE_ENV === "development" ? err.stack : err.stack));
};

export default errorHandler;
