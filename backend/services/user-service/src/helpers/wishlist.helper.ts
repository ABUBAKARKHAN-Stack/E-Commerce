import { userModel } from "../models/user.model";


const addToWishList = async (productId: string, userId: string) => {
    if (!productId) {
        console.log('No Product id received');
        return;
    }
    if (!userId) {
        console.log('No user id id received');
        return;
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            console.log('user not found');
            return;
        }
        const alreadyAdded = user.wishlist.includes(productId);
        if (alreadyAdded) {
            console.log('Product already added in wishlist');
            return;
        }
        user.wishlist.push(productId);
        await user.save();
        console.log("Product Added into Wishlist");
    } catch (error) {
        console.log("Error while adding product into wishlist", error);
    }
}

const removeFromWishList = async (productId: string, userId: string) => {

    if (!productId) {
        console.log('No Product id is received');
        return;
    }
    if (!userId) {
        console.log('No user id is received');
        return;
    }

    try {

        await userModel.findByIdAndUpdate(userId, {
            $pull: {
                wishlist: productId,
            }
        });
        console.log("Product Removed from Wishlist");
    } catch (error) {
        console.log("Error while removing product from wishlist", error);
    }
}


export {
    addToWishList,
    removeFromWishList
}