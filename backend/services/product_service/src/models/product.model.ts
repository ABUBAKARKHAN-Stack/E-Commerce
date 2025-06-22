import { IProduct, IReviews } from '../types/main.types';
import { model, Schema } from 'mongoose';


const reviewSchema = new Schema<IReviews>({
    userId: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: false,
        trim: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, { timestamps: true })

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {

        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: [String],
        required: true
    },
    reviews: [reviewSchema],
    avgRating: {
        type: Number,
        default: 0,
        index: true
    },
    totalReviews: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export default model<IProduct>('Product', productSchema);