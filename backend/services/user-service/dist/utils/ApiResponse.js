"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    statusCode;
    message;
    data;
    success;
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode > 400 ? false : true;
    }
}
exports.ApiResponse = ApiResponse;
