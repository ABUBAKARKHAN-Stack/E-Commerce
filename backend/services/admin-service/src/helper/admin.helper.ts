import { adminModel } from "../models/admin.model";
import { ApiError } from "../utils/ApiError";

export const existing = async (emailOrPhone: string, adminId?: string) => {
    const query: any = {
        $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    };

    if (adminId) {
        query._id = { $ne: adminId };
    }

    const existingUser = await adminModel.findOne(query).lean();

    if (existingUser) {
        throw new ApiError(400, "Email or Phone Already Exists. Please Try Different.");
    }
};
