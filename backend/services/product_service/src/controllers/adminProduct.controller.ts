import productModel from "../models/product.model";
import { ApiResponse, ApiError, publishEvent } from '../utils/index'
import { addProduct, invalidateProductCache, removeProduct, updateProduct as updateProductFromRedis } from "../helper/redisProduct.helper";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from 'express'
import { CreateProduct, IProduct } from "../types/main.types";
import { uploadOnCloudinary, deleteOnCloudinary, thumbnailForProduct } from '../config/cloudinary.config'
import mongoose from "mongoose";
import {  removeBg } from "../config/removebg.config";

const createProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    let { name, description, price, quantity, category }: CreateProduct = req.body
    const spaceRegex = /\s/;


    if (!name || !description || !price || !quantity || !category) {
        throw new ApiError(400, "All fields are required")
    }

    if (price !== undefined && (isNaN(price) || price <= 0)) {
        throw new ApiError(400, "Price must be greater than 0");
    }
    if (quantity !== undefined && (isNaN(quantity) || quantity < 0)) {
        throw new ApiError(400, "Quantity cannot be negative");
    }

    const files = req.files as Express.Multer.File[]
    let thumbnails: string[] = [];

    for (const file of files) {
        const imageBuffer = await removeBg(file.path)

        if (!imageBuffer) {
            throw new ApiError(500, "Failed to process image. Please try uploading a different image.");
        }
        const response = await uploadOnCloudinary(imageBuffer);
        const thumbnailUrl = await thumbnailForProduct(response.public_id);

        thumbnails.push(thumbnailUrl);
    }


    if (spaceRegex.test(category.toLowerCase())) {
        category = category.replaceAll(" ", "-");
    }

    const product = await productModel.create({
        name,
        description,
        price,
        quantity,
        category: category.toLowerCase(),
        thumbnails: thumbnails
    })
    if (!product) {
        throw new ApiError(400, "Product not created")
    }

    try {
        await publishEvent<IProduct>("product.creation", "created_product", product)
    } catch (error) {
        console.error('Error publishing product created event:', error);
        throw new ApiError(500, "Error publishing product created event");
    }

    await addProduct(product)
    res
        .status(201)
        .json(new ApiResponse(201, "Product created successfully", product))

})

const updateProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    let { name, description, price, quantity, category } = req.body
    const spaceRegex = /\s/;

    if (!name && !description && !price && !quantity && !category) {
        throw new ApiError(400, "At least one field is required") 
    }
    if (price) {
        if (price !== undefined && (isNaN(price) || price <= 0)) {
            throw new ApiError(400, "Price must be greater than 0");
        }
    }
    if (quantity) {
        if (quantity !== undefined && (isNaN(quantity) || quantity < 0)) {
            throw new ApiError(400, "Quantity cannot be negative");
        }
    }

    if (spaceRegex.test(category.toLowerCase())) {
        category = category.replaceAll(" ", "-");
    }


    const updatedFields: Partial<CreateProduct> = {}
    if (name) updatedFields.name = name;
    if (description) updatedFields.description = description;
    if (price) updatedFields.price = price;
    if (quantity) updatedFields.quantity = quantity;
    if (category) updatedFields.category = category.toLowerCase();

    const product = await productModel.findById(req.params.id)
    const files = req.files as Express.Multer.File[]
    let thumbnails: string[] = [];


    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    if (files) {
        if (product.thumbnails.length >= 5 || product.thumbnails.length + files.length > 5) {
            throw new ApiError(400, "You can add only 5 thumbnails")
        }
        for (const file of files) {
            const imageBuffer = await removeBg(file.path);
            if (!imageBuffer) {
                throw new ApiError(500, "Failed to process image. Please try uploading a different image.");
            }
            const response = await uploadOnCloudinary(imageBuffer);
            const thumbnailUrl = await thumbnailForProduct(response.public_id)
            thumbnails.push(thumbnailUrl)
        }

    }

    product.set(updatedFields)

    if (thumbnails.length > 0) {
        product.thumbnails.push(...thumbnails)
    }

    await product.save()


    await updateProductFromRedis((product._id as mongoose.Schema.Types.ObjectId).toString(), product)
    await invalidateProductCache((product._id as mongoose.Schema.Types.ObjectId).toString())
    res
        .status(200)
        .json(new ApiResponse(200, "Product updated successfully", product))
})

const addThumbnail = expressAsyncHandler(async (req: Request, res: Response) => {
    const product = await productModel.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    if (product.thumbnails.length >= 5) {
        throw new ApiError(400, "You can add only 5 thumbnails")
    }
    const files = req.files as Express.Multer.File[]

    if (files.length + product.thumbnails.length > 5) {
        throw new ApiError(400, "You can add only 5 thumbnails");
    }

    for (const file of files) {
        const imageBuffer = await removeBg(file.path);
        if (!imageBuffer) {
            throw new ApiError(500, "Failed to process image. Please try uploading a different image.");
        }
        const response = await uploadOnCloudinary(imageBuffer);
        const thumbnailUrl = await thumbnailForProduct(response.public_id);
        product.thumbnails.push(thumbnailUrl);
    }

    await product.save();

    await updateProductFromRedis((product._id as mongoose.Schema.Types.ObjectId).toString(), product)
    await invalidateProductCache((product._id as mongoose.Schema.Types.ObjectId).toString())
    res
        .status(200)
        .json(new ApiResponse(200, "Thumbnail added successfully", product))
})

const removeThumbnail = expressAsyncHandler(async (req: Request, res: Response) => {
    let thumbnailIndex = req.query.thumbnailIndex as string | number;


    if (!thumbnailIndex) {
        throw new ApiError(400, "Thumbnail index is required")
    }
    const product = await productModel.findById(req.params.id)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }
    if (product.thumbnails.length <= 0) {
        throw new ApiError(400, "No thumbnails to remove")
    }
    thumbnailIndex = +thumbnailIndex
    if (thumbnailIndex < 0 || thumbnailIndex >= product.thumbnails.length) {
        throw new ApiError(400, "Invalid thumbnail index")
    }

    const thumbnail = product.thumbnails[thumbnailIndex]

    product.thumbnails.splice(thumbnailIndex, 1)
    const publicId = thumbnail.split("/").pop()?.split("?")[0]
    await deleteOnCloudinary(publicId!)

    await product.save()

    await updateProductFromRedis((product._id as mongoose.Schema.Types.ObjectId).toString(), product)
    await invalidateProductCache((product._id as mongoose.Schema.Types.ObjectId).toString())

    res
        .status(200)
        .json(new ApiResponse(200, "Thumbnail removed successfully", product))

})

const deleteProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    const product = await productModel.findById(req.params.id)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }
    try {
        if (product.thumbnails.length > 0) {
            for (const thumbnail of product.thumbnails) {
                const publicId = thumbnail.split("/").pop()?.split("?")[0]
                await deleteOnCloudinary(publicId!)
            }
        }
    } catch (error) {
        throw new ApiError(500, "Failed to delete thumbnail from cloudinary", error)
    }
    await product.deleteOne()


    try {
        await publishEvent<IProduct>("product.deletion", "deleted_product", product)
    } catch (error) {
        console.log("Error publishing product deletion event:", error);
        throw new ApiError(500, "Error publishing product deletion event");
    }
    await removeProduct(req.params.id)
    await invalidateProductCache((product._id as mongoose.Schema.Types.ObjectId).toString())
    res
        .status(200)
        .json(new ApiResponse(200, "Product deleted successfully", product))
})



export {
    createProduct,
    updateProduct,
    addThumbnail,
    removeThumbnail,
    deleteProduct,
}