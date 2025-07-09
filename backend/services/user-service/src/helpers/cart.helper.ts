import { cartModel } from "../models/cart.model";

const handleCartCreation = async ({ userId, product, }: { userId: string, product: any }) => {
    try {
        const cart = await cartModel.findOne({ user: userId });
        if (cart) {
            const existingProduct = cart.products.find((p) => p.productId === product.productId);
            if (existingProduct) {
                existingProduct.quantity += +product.quantity;
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

const handleProductDeletionFromCart = async ({
    productId,
    userId
}: { productId: string, userId: string }) => {

    if (!productId) {
        console.log("Product Id is required");
        return;
    }
    try {
        const cart = await cartModel.findOne({ user: userId })

        if (!cart) {
            console.log('Cart not found');
            return;
        }

        const index = cart.products.findIndex((p) => p.productId === productId);

        if (index === -1) {
            console.log('Product index not found');
            return;
        }

        cart.products.splice(index, 1);
        await cart.save();

        console.log('Product removed from cart successfully');
    } catch (error) {
        console.log('Error Removing product from cart', error);

    }

}

export {
    handleCartCreation,
    handleProductDeletionFromCart

};