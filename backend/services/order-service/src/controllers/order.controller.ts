import expressAsyncHandler from "express-async-handler";
import orderModel from "../models/order.model";
import { ApiResponse, ApiError } from "../utils/";
import { Request, Response } from "express";



const getOrder = expressAsyncHandler(async (req: Request, res: Response) => {
    const { userId } = res.locals.user;
    const order = await orderModel.findOne({ user: userId });
    if (!order) {
        throw new ApiError(404, "Order not found");
    }
    res
        .status(200)
        .json(new ApiResponse(200, "Order fetched successfully", order));
})


export {
    getOrder
}