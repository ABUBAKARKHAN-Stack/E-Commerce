import mongoose from "mongoose";
import { cartModel } from "../models/cart.model";

const handleCartCreation = async ({ userId, product, }: { userId: mongoose.Schema.Types.ObjectId, product: any }) => {
    try {
        const cart = await cartModel.findOne({ user: userId });
        if (cart) {
            const existingProduct = cart.products.find((p) => p.productId === product.productId);
            if (existingProduct?.thumbnail && existingProduct?.thumbnail !== product.thumbnail) {
                console.log("Thumbnail changed");
                existingProduct!.thumbnail += product.thumbnail;
            }
            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                cart.products.push(product);
            }
            await cart.save();
            console.log("Cart updated successfully");
        } else {
            await cartModel.create({
                user: userId,
                products: [product],
            });
            console.log("New cart created successfully");
        }
    } catch (dbError) {
        console.error("Error creating cart:", dbError);
    }
};

export { handleCartCreation };