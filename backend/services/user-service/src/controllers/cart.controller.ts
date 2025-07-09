import mongoose from "mongoose";
import { ApiError, ApiResponse, publishEvent } from "../utils";
import { cartModel } from "../models/cart.model";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";


const getCartDetails = expressAsyncHandler(async (req: Request, res: Response) => {
    const { _id } = res.locals.user
    const userId = _id

    const cart = await cartModel.findOne({
        user: userId
    }).select('totalAmount products.productId products.quantity');
    

    if (!cart || (cart.totalAmount <= 0 && cart.products.length === 0)) {
        res
            .status(200)
            .json(new ApiResponse(200, 'Cart is empty', {
                products: [],
                totalAmount: 0
            }));
        return;
    }

    res
        .status(200)
        .json(new ApiResponse(200, "Cart details", cart))
})

const proceedToCheckout = expressAsyncHandler(async (req: Request, res: Response) => {
    const { _id } = res.locals.user;
    const userId = _id;

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
    ]);
    if (!cart.length) {
        throw new ApiError(404, "Cart not found");
    }

    console.log(cart);

    await publishEvent("cart-checkout", "checkout", cart)
    res
        .status(200)
        .json(new ApiResponse(200, "Proceeding to checkout", cart))
})


export {
    getCartDetails,
    proceedToCheckout
}