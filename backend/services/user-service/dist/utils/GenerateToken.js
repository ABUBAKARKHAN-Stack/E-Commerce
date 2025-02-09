"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(payload, expiry) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT SECRET is not defined');
    }
    if (!expiry) {
        throw new Error('JWT EXPIRY is not defined');
    }
    const token = jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: expiry
    });
    return token;
}
