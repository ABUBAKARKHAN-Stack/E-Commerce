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
export {
    IProduct,
    IReviews,
    CreateProduct,
    JwtUpdatedPayload
};