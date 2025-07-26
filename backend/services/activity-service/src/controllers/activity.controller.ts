import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import activityModel from "../models/activity.model";
import { ApiResponse } from "../utils";

const getRecentActivity = expressAsyncHandler(async (req: Request, res: Response) => {
    const { userId } = res.locals.user;
    const {
        limit,
        page
    } = req.query;
    const sortBy: any = { createdAt: -1 };

    const paginationOptions: any = {};
    paginationOptions.limit = Number(limit) || 10;
    paginationOptions.page = Number(page) || 1;


    const skip = (paginationOptions.page - 1) * paginationOptions.limit;


    const recentActivity = await activityModel.find({
        userId
    })
        .limit(paginationOptions.limit)
        .skip(skip)
        .sort(sortBy)
        .lean()
        .select('-updatedAt -_id -__v')

    res
        .status(200)
        .json(new ApiResponse(200, "Recent Activity Fetched", recentActivity))
})

export {
    getRecentActivity
}