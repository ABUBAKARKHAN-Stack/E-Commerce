import { IActivity } from "../types/main.types";
import activityModel from "../models/activity.model";

const createActivity = async ({
    activityType,
    activityDescription,
    userId,
    metaData
}: IActivity) => {
    if (!activityType || !activityDescription || !userId) {
        console.log('Activity Type , Description and UserId is required');
        return;
    }

    const activity = await activityModel.create({
        activityType,
        activityDescription,
        userId,
        metaData
    })

    if (!activity) {
        console.log('Error While Creating Activity');
        return;
    }

    console.log('Activity Created Successfully', activity);

}

export {
    createActivity
}