import expressAsyncHandler from "express-async-handler"
import productModel from "../models/product.model"
import { Request, Response } from "express"
import { ApiError, ApiResponse, publishEvent, subscribeToTopics } from '../utils'
import redisClient from "../config/redis.config"
import mongoose from "mongoose"
import { getAllRedisProducts, getProductbyId } from "../helper/redisProduct.helper"


const getAllProducts = expressAsyncHandler(async (req: Request, res: Response) => {
    const cachedProducts = await getAllRedisProducts()

    if (cachedProducts.length > 0) {
        console.log("🚀 Fetched products from cache");
        res
            .status(200)
            .json(new ApiResponse(200, "Products fetched successfully from cache", cachedProducts))
        return;
    }

    const products = await productModel.find()
    if (products.length === 0) {
        throw new ApiError(404, "Products not found")
    }
    await redisClient.set("products", JSON.stringify(products))
    await redisClient.expire("products", 60 * 60)
    res
        .status(200)
        .json(new ApiResponse(200, "Products fetched successfully", products))
})


const getProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    const cachedProduct = await getProductbyId(req.params.id)
    if (cachedProduct) {
        console.log("🚀 Fetched product from cache");
        res
            .status(200)
            .json(new ApiResponse(200, "Product fetched successfully from cache", cachedProduct))
        return;
    }
    const product = await productModel.findById(req.params.id)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }
    res
        .status(200)
        .json(new ApiResponse(200, "Product fetched successfully", product))
})


const addToCart = expressAsyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    const { userId } = res.locals.user;
    const { quantity } = req.body;

    if (quantity <= 0) {
        throw new ApiError(400, "Quantity must be greater than 0");
    }

    const product = await productModel.findOneAndUpdate(
        { _id: productId, quantity: { $gte: quantity } },
        { $inc: { quantity: -quantity } },
        { new: true }
    ).select("name price quantity thumbnails");

    if (!product) {
        throw new ApiError(400, "Product not found or insufficient stock");
    }

    const cartedProducts = {
        product: {
            productId: (product._id as mongoose.Types.ObjectId).toString(),
            name: product.name,
            price: product.price,
            quantity,
            thumbnail: product.thumbnails[0],
        },
        userId,
    };

    // ✅ Send response before publishing event
    res.status(200).json(new ApiResponse(200, "Product added to cart successfully", cartedProducts));

    publishEvent("cart-creation", "created_cart", cartedProducts)
        .then(() => console.log("Event published successfully", cartedProducts))
        .catch((error) => console.error('Error publishing product created event:', error));
});

const removeFromCart = expressAsyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    const { userId } = res.locals.user;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const cartedProducts = { productId, userId };

    try {
        // Publish event to Kafka
        await publishEvent("product-removal", "removed_product", cartedProducts);
        console.log("✅ Event published successfully", cartedProducts);

        // Respond immediately (error handling is done asynchronously)
        res.status(202).json(new ApiResponse(202, "Product removal request sent"));
    } catch (error) {
        console.error("🚨 Error in product removal:", error);
        throw new ApiError(500, "Error processing removal request")
    }
});


const updateCart = expressAsyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    const { userId } = res.locals.user;
    const { quantity } = req.body;

    if (quantity <= 0) {
        throw new ApiError(400, "Quantity must be greater than 0");
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, "Invalid product ID");
    }
    const product = await productModel.findOneAndUpdate(
        { _id: productId, quantity: { $gte: quantity } },
        { $inc: { quantity: -quantity } },
        { new: true }
    ).select("name price quantity thumbnails");

    if (!product) {
        throw new ApiError(400, "Product not found or insufficient stock");
    }

    const cartedProducts = {
        product: {
            productId: (product._id as mongoose.Types.ObjectId).toString(),
            name: product.name,
            price: product.price,
            quantity,
            thumbnail: product.thumbnails[0],
        },
        userId,
    };

    await publishEvent("cart-update", "updated_cart", cartedProducts)
        .then(() => console.log("✅ Event published successfully", cartedProducts))
        .catch((error) => console.error('Error publishing product created event:', error));

    res
        .status(200)
        .json(new ApiResponse(200, "Product updated successfully", product))
})


export {
    getAllProducts,
    getProduct,
    addToCart,
    updateCart,
    removeFromCart
}