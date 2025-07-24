import mongoose from "mongoose";
import { IActivity } from '../types/main.types'

const activitySchema = new mongoose.Schema<IActivity>({
    userId: { type: String, required: true },
    activityType: { type: String, required: true },
    activityDescription: { type: String, required: true },
    metaData: { type: Object, default: {} }
}, { timestamps: true });

const activityModel = mongoose.model<IActivity>('Activity', activitySchema);
export default activityModel;