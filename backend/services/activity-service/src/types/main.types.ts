import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongoose";

export interface IActivity extends Document {
    userId: string;
    activityType: string;
    activityDescription: string;
    metaData?: object
}


export interface JwtUpdtedPayload extends JwtPayload {
    userId?: string;
    email?: string;
}