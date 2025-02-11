import { userModel } from "../models/user.model";
import { ApiError } from "../utils/ApiError";

export const existing = async (emailOrPhone: string, userId?: string) => {
    const query: any = {
        $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    };

    if (userId) {
        query._id = { $ne: userId }; 
    }

    const existingUser = await userModel.findOne(query).lean();

    if (existingUser) {
        throw new ApiError(400, "Email or Phone Already Exists. Please Try Different.");
    }
};
