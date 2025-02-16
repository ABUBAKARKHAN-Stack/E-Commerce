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
export { IProduct, CreateProduct , JwtUpdatedPayload };