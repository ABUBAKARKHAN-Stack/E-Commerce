import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import activityModel from "../models/activity.model";
import { ApiResponse } from "../utils";

const createActivity = expressAsyncHandler(async (req: Request, res: Response) => {
    const { type, description } = req.body;
    const { userId } = res.locals.user;

    const activity = await activityModel.create({
        userId,
        activityType: type,
        activityDescription: description
    });

    res
        .status(200)
        .json(new ApiResponse(200, "Activity Created Successfully" ,activity))
})

export {
    createActivity
}