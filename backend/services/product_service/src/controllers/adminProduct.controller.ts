import productModel from "../models/product.model";
import { ApiResponse, ApiError, publishEvent } from '../utils/index'
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from 'express'
import { CreateProduct, IProduct } from "../types/main.types";
import { uploadOnCloudinary, deleteOnCloudinary, thumbnailForProduct } from '../config/cloudinary.config'

const createProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    const { name, description, price, quantity, category }: CreateProduct = req.body

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
        const response = await uploadOnCloudinary(file.path)
        const thumbnailUrl = await thumbnailForProduct(response.public_id)
        thumbnails.push(thumbnailUrl)
    }
    

    const product = await productModel.create({
        name,
        description,
        price,
        quantity,
        category,
        thumbnails: thumbnails
    })
    if (!product) {
        throw new ApiError(400, "Product not created")
    }

    // try {
    //     await publishEvent<IProduct>("product-creation", "created_product", product)
    // } catch (error) {
    //     console.error('Error publishing product created event:', error);
    //     throw new ApiError(500, "Error publishing product created event");
    // }

    res
        .status(201)
        .json(new ApiResponse(201, "Product created successfully", {product,thumbnails}))

})

const getAllProducts = expressAsyncHandler(async (req: Request, res: Response) => {
    const products = await productModel.find()
    if (products.length === 0) {
        throw new ApiError(404, "Products not found")
    }
    res
        .status(200)
        .json(new ApiResponse(200, "Products fetched successfully", products))
})

const getProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    const product = await productModel.findById(req.params.id)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }
    res
        .status(200)
        .json(new ApiResponse(200, "Product fetched successfully", product))
})

const updateProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    const { name, description, price, quantity, category } = req.body
    console.log(req.cookies, req.headers);

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

    const updatedFields: Partial<CreateProduct> = {}
    if (name) updatedFields.name = name
    if (description) updatedFields.description = description
    if (price) updatedFields.price = price
    if (quantity) updatedFields.quantity = quantity
    if (category) updatedFields.category = category


    const product = await productModel.findByIdAndUpdate(req.params.id,
        updatedFields,
        { new: true })

    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    res
        .status(200)
        .json(new ApiResponse(200, "Product updated successfully", product))
})

const addThumbnail = expressAsyncHandler(async (req: Request, res: Response) => {
    const product = await productModel.findById(req.params.id)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }
    if (product.thumbnails.length >= 5) {
        throw new ApiError(400, "Maximum thumbnails reached")
    }
    const files = req.files as Express.Multer.File[]


    for (const file of files) {
        const response = await uploadOnCloudinary(file.path)
        const thumbnailUrl = await thumbnailForProduct(response.public_id)
        product.thumbnails.push(thumbnailUrl)
    }

    await product.save()

    res
        .status(200)
        .json(new ApiResponse(200, "Thumbnail added successfully", product))
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

    // try {
    //     await publishEvent<IProduct>("product-deletion", "deleted_product", product)
    // } catch (error) {
    //     console.log("Error publishing product deletion event:", error);
    //     throw new ApiError(500, "Error publishing product deletion event");
    // }

    res
        .status(200)
        .json(new ApiResponse(200, "Product deleted successfully", product))
})

export {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    addThumbnail,
    deleteProduct
}