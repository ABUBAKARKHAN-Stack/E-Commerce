import mongoose from "mongoose";
import { ApiError, ApiResponse, publishEvent } from "../utils";
import { cartModel } from "../models/cart.model";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { handleCartCreation } from "../helpers/cart.helper";




// const handleProductDeletionFromCart = async ({ userId, productId }: { userId: mongoose.Schema.Types.ObjectId, productId: mongoose.Schema.Types.ObjectId }) => {
//     try {
//         const cart = await cartModel.findOne({ user: userId });
//         if (cart) {
//             const productIndex = cart.products.findIndex((p) => p.product.toString() === productId.toString())
//             if (productIndex === -1) {
//                 console.log("🚨 Product not found in cart");

//                 await publishEvent("errorOn-product-removal", "error-on-cart-deletion", {
//                     message: "Product not found in cart",
//                 })
//                     .then(() => console.log("✅ Event published successfully"))
//                     .catch((error) => console.error("❌ Error publishing event:", error));

//                 return;
//             }

//             cart.products.splice(productIndex, 1);
//             await cart.save();
//             console.log("product remove from cart");
//         }
//     } catch (error) {
//         console.log("Error while deleting product from cart :: ", error);
//     }
// }

const getCartDetails = expressAsyncHandler(async (req: Request, res: Response) => {
    const { _id } = res.locals.user
    const userId = _id

    const cart = await cartModel.findOne({
        user: userId
    })

    if (!cart) {
        throw new ApiError(404, "Cart not found")
    }

    res
        .status(200)
        .json(new ApiResponse(200, "Cart details", cart))
})

const proceedToCheckout = expressAsyncHandler(async (req: Request, res: Response) => {
    const { _id } = res.locals.user
    const userId = _id
    const cart = await cartModel.aggregate([
        {
            $match: {
                user: userId
            }
        },
        {
            $project: {
                _id: 1,
                user: 1,
                products: {
                    name: 1,
                    price: 1,
                    quantity: 1
                },
                totalAmount: 1

            }
        }
    ])
    if (!cart) {
        throw new ApiError(404, "Cart not found")
    }

    console.log(cart);

    await publishEvent("cart-checkout", "checkout", cart)
    res
        .status(200)
        .json(new ApiResponse(200, "Proceeding to checkout", cart))
})


export {
    // handleProductDeletionFromCart,
    getCartDetails,
    proceedToCheckout

}