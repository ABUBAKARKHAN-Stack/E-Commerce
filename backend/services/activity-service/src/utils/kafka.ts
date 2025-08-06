import { ActivityType, IActivity } from "../types/main.types";
import { kafka } from "../config/kafka.config";
import { createActivity } from "../helpers/activity.helper";


const activityEventConsumer = async () => {
    const consumer = kafka.consumer({
        groupId: "activity-service-group"
    })

    console.log('Connecting to consumer...');
    await consumer.connect()
    console.log('Subscribing Topics...');


    await consumer.subscribe({
        topics: [
            'activity.user.register',
            'activity.user.login',
            'activity.user.logout',
            'activity.user.update.profile',
            'activity.user.change.password',
            'activity.user.verify.account',
            'activity.user.reset.password',
            'activity.user.cart.add',
            'activity.user.cart.remove',
            'activity.user.wishlist.add',
            'activity.user.wishlist.remove',
            'activity.user.product.view',
            'activity.user.review.write',
            'activity.user.review.delete',
            'activity.user.order.placed',
            'activity.user.order.paid'
        ],
    });

    console.log('Running Consumer...');

    await consumer.run({
        eachMessage: async ({ message }) => {
            try {
                const messageKey = message.key?.toString();
                const messageValue = message.value ? JSON.parse(message.value.toString()) : null;
                if (!messageValue) {
                    console.log("Invalid message value received");
                    return;
                };

                const { activityType, activityDescription, metaData, userId }: IActivity = messageValue;

                switch (messageKey) {
                    case ActivityType.REGISTER:
                    case ActivityType.LOGIN:
                    case ActivityType.LOGOUT:
                    case ActivityType.UPDATE_PROFILE:
                    case ActivityType.CHANGE_PASSWORD:
                    case ActivityType.VERIFY_ACCOUNT:
                    case ActivityType.RESET_PASSWORD:
                    case ActivityType.ADD_TO_CART:
                    case ActivityType.REMOVE_FROM_CART:
                    case ActivityType.ADD_TO_WISHLIST:
                    case ActivityType.REMOVE_FROM_WISHLIST:
                    case ActivityType.VIEW_PRODUCT:
                    case ActivityType.WRITE_REVIEW:
                    case ActivityType.DELETE_REVIEW:
                    case ActivityType.PLACE_ORDER:
                    case ActivityType.PAID_ORDER:

                        await createActivity({
                            activityDescription,
                            activityType,
                            userId,
                            metaData
                        })
                        break;

                    default:
                        console.log("Invalid Message Key", messageKey);
                        break;
                }
            } catch (error) {
                console.log("Error while consuming activity event :: ", error);
            }
        }
    })



}


export {
    activityEventConsumer
}