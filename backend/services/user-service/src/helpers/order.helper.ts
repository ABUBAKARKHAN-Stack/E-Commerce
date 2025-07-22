import { sendEmail } from "../utils";
import { userModel } from "../models/user.model";
import { orderConfirmationTemplate } from "./emailTemplate.helper";

const sendOrderConfirmationMail = async ({ userId, orderId }: { userId: string; orderId: string }) => {
    const user = await userModel.findById(userId);
    if (!user) {
        console.log("User Not Found");
        return;
    }
    await sendEmail(
        'ShopNex Order Confirmation',
        user.email,
        `Your ShopNex Order #${orderId}`,
        orderConfirmationTemplate(user.username, orderId)
    );
}

export {
    sendOrderConfirmationMail
}