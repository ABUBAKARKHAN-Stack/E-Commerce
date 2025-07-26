import mongoose from "mongoose";
import { ActivityType, IActivitySchema } from '../types/main.types'

const activitySchema = new mongoose.Schema<IActivitySchema>({
    userId: { type: String, required: true },
    activityType: { type: String, enum: Object.values(ActivityType), required: true },
    activityDescription: { type: String, required: true },
    metaData: { type: Object, default: {} }
}, { timestamps: true });

const activityModel = mongoose.model<IActivitySchema>('Activity', activitySchema);
export default activityModel;