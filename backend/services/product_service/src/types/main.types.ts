import { Document } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    thumbnail: string;
    thumbnails: string[];
    reviews: IReviews[];
    avgRating: number;
    totalReviews: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IReviews extends Document {
    userId: string;
    review?: string;
    rating: number;
    createdAt: Date
}

interface CreateProduct {
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    thumnail: string
}

interface JwtUpdatedPayload extends JwtPayload {
    userId: string;
}

enum ActivityType {
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",

    ADD_TO_WISHLIST = "ADD_TO_WISHLIST",
    REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST",

    VIEW_PRODUCT = "VIEW_PRODUCT",

    WRITE_REVIEW = "WRITE_REVIEW",
    DELETE_REVIEW = "DELETE_REVIEW",

}

export {
    IProduct,
    IReviews,
    CreateProduct,
    JwtUpdatedPayload,
    ActivityType
};