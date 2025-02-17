import expressAsyncHandler from "express-async-handler"
import productModel from "../models/product.model"
import { Request, Response } from "express"
import { ApiError, ApiResponse } from '../utils'


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

export {
    getAllProducts,
    getProduct
}