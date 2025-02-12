"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const connectDb = async () => {
    try {
        const connectionInstance = await mongoose_1.default.connect(env_1.env.DB_URI);
        const { host, port, name } = connectionInstance.connection;
        console.log(`Connected to database at ${host}:${port}/${name}`);
    }
    catch (error) {
        console.log("Error Database Connection :: ", error);
    }
};
exports.connectDb = connectDb;
