import { OrderStatus } from "../types/main.types";

const isOrderCancelable = (status: string, confirmedAt: Date) => {
    if (status === OrderStatus.PENDING) return true;

    if (status === OrderStatus.CONFIRMED) {
        const oneHourTime = 1 * 60 * 60 * 1000;
        const timeSinceConfirmed = new Date().getTime() - new Date(confirmedAt).getTime();
        return timeSinceConfirmed <= oneHourTime;
    }

    return false;
};

export default isOrderCancelable;
