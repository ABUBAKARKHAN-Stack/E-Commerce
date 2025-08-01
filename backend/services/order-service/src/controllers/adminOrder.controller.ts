import { Request, Response } from "express";
import orderModel from "../models/order.model";
import expressAsyncHandler from "express-async-handler";
import { ApiError, ApiResponse } from "../utils";
import { OrderStatus } from "../types/main.types";

const getAllOrder = expressAsyncHandler(async (req: Request, res: Response) => {
    const {
        status,
        paymentStatus,
        shippingMethod,
        paymentMethod,
        sortBy,
        page,
        limit,
    }
        = req.query;

    //* Apply Query Filters
    const query: any = {};
    if (status) query.status = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (shippingMethod) query.shippingMethod = shippingMethod;
    if (paymentMethod) query.paymentMethod = paymentMethod;

    //* Apply Sorting
    const sortOptions: any = {};
    if (sortBy) {
        if (sortBy === "newest") {
            sortOptions.createdAt = -1;
        } else if (sortBy === "oldest") {
            sortOptions.createdAt = 1;
        } else if (sortBy === "amountAsc") {
            sortOptions.cart.totalAmount = 1;
        } else if (sortBy === "amountDesc") {
            sortOptions.cart.totalAmount = -1;
        } else if (sortBy === "etaSoonest") {
            sortOptions.deliveryDate = 1
        } else if (sortBy === "etaLatest") {
            sortOptions.deliveryDate = -1
        }
    }

    //* Apply Pagination
    const paginationQuery: any = {}
    paginationQuery.limit = parseInt(limit as string) || 10;
    paginationQuery.page = parseInt(page as string) || 1;
    const skip = (paginationQuery.page - 1) * paginationQuery.limit;

    const orders = await orderModel
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(paginationQuery.limit);

    if (orders.length === 0) {
        res
            .status(200)
            .json(new ApiResponse(200, "No orders match your criteria"))
        return;
    }

    const totalOrders = await orderModel.countDocuments(query);


    res
        .status(200)
        .json(new ApiResponse(200, "Orders Fetched", {
            orders,
            totalOrders
        }))

}
)

const getSingleOrder = expressAsyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;

    if (!orderId) {
        throw new ApiError(400, "Order Id is required")
    }

    const order = await orderModel.findOne({
        orderId
    })

    if (!order) {
        throw new ApiError(404, `No Order Found With Order Id ${orderId}`)
    }

    res
        .status(200)
        .json(new ApiResponse(200, "Order Details Fetched", order))
})

const markOrderAsProcessing = expressAsyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;

    if (!orderId) {
        throw new ApiError(400, "Order Id is required")
    }

    const order = await orderModel.findOne({
        orderId,
        status: OrderStatus.CONFIRMED
    })

    if (!order) {
        throw new ApiError(404, "Order Not Found!")
    }

    order.status = OrderStatus.PROCESSING;
    await order.save();

    res
        .status(200)
        .json(new ApiResponse(200, "Order Marked As Processing"))
})

const markOrderAsShipped = expressAsyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;

    if (!orderId) {
        throw new ApiError(400, "Order Id is required")
    }

    const order = await orderModel.findOne({
        orderId,
        status: OrderStatus.PROCESSING
    })

    if (!order) {
        throw new ApiError(404, "Order Not Found!")
    }

    order.status = OrderStatus.SHIPPED;
    await order.save();

    res
        .status(200)
        .json(new ApiResponse(200, "Order Marked As Shipped"))
})

const markOrderAsDelivered = expressAsyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;

    if (!orderId) {
        throw new ApiError(400, "Order Id is required")
    }

    const order = await orderModel.findOne({
        orderId,
        status: OrderStatus.SHIPPED
    })

    if (!order) {
        throw new ApiError(404, "Order Not Found!")
    }

    order.status = OrderStatus.DELIVERED;
    order.isDelivered = true
    await order.save();

    res
        .status(200)
        .json(new ApiResponse(200, "Order Marked As Delivered"))
})

export {
    getAllOrder,
    getSingleOrder,
    markOrderAsProcessing,
    markOrderAsShipped,
    markOrderAsDelivered
}