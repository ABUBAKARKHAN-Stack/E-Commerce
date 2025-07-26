import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongoose";

export interface IActivity {
    userId: string;
    activityType: ActivityType;
    activityDescription: string;
    metaData?: object
}

export interface IActivitySchema extends IActivity, Document { }


export interface JwtUpdtedPayload extends JwtPayload {
    userId?: string;
    email?: string;
}

export enum ActivityType {

    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    REGISTER = "REGISTER",


    UPDATE_PROFILE = "UPDATE_PROFILE",
    CHANGE_PASSWORD = "CHANGE_PASSWORD",
    VERIFY_ACCOUNT = "VERIFY_ACCOUNT",
    RESET_PASSWORD = "RESET_PASSWORD",


    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",

    ADD_TO_WISHLIST = "ADD_TO_WISHLIST",
    REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST",

    PLACE_ORDER = "PLACE_ORDER",
    CANCEL_ORDER = "CANCEL_ORDER",
    PAID_ORDER = "PAID_ORDER",

    WRITE_REVIEW = "WRITE_REVIEW",
    DELETE_REVIEW = "DELETE_REVIEW",

    VIEW_PRODUCT = "VIEW_PRODUCT",

}
