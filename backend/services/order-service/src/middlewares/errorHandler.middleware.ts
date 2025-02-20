import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/index";
import { env } from "../config/env";

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    // Handle custom ApiError
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            error: err.error || null,
        });
        return;
    }

    // Handle all other errors
    res.status(500).json(new ApiError(500, "Internal Server Error", env.NODE_ENV === "development" ? err.stack : err.stack));
};

export default errorHandler;
