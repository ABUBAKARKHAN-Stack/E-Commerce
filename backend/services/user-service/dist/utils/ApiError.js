"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError {
    statusCode;
    message;
    error;
    constructor(statusCode, message, error) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}
exports.ApiError = ApiError;
