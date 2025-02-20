import { IProduct } from '../types/main.types';
import { model, Schema } from 'mongoose';

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
})

export default model<IProduct>('Product', productSchema);