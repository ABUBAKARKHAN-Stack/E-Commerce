import { Schema, model } from "mongoose";
import { ICart, ICartProduct } from "../types/main.types";

const cartProductSchema = new Schema<ICartProduct>({
    productId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const cartSchema = new Schema<ICart>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [cartProductSchema],
    totalAmount: {
        type: Number,
        required: true,
        default: 0,
    }
}); 

cartSchema.pre("save", function (next) {
    this.totalAmount = this.products.reduce((acc, product) => {
        return acc + product.price * product.quantity
    }, 0)
    next();
})

const cartModel = model<ICart>("Cart", cartSchema);
export { cartModel };