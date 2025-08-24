import {
  completeCheckout,
  proceedToCheckout,
  userTrackOrder,
} from "@/API/userApi";
import { ApiErrorType, CompleteCheckoutBody } from "@/types/main.types";
import { errorToast, successToast } from "@/utils/toastNotifications";
import { AxiosError } from "axios";

const proceedToCheckoutHelper = async (navigate: (path: string) => void) => {
  try {
    const res = await proceedToCheckout();
    if (res.status === 200) navigate("/checkout");
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    const errMsg = err.response?.data.message || "Something went wrong";
    errorToast(errMsg);
    throw err;
  }
};

const userTrackOrderHelper = async ({
  navigate,
  orderId,
}: {
  orderId: string;
  navigate: (path: string) => void;
}) => {
  try {
    const res = await userTrackOrder(orderId);

    if (res.status === 200) {
      successToast(res.data.message);
      navigate(`/track-order?orderId=${res.data.data.orderId}`);
    }
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    const errMsg = err.response?.data.message || "Something went wrong";
    errorToast(errMsg);
    throw err;
  }
};

const completeCheckoutHelper = async (checkoutBody: CompleteCheckoutBody) => {
  try {
    const res = await completeCheckout(checkoutBody);
    if (res.status === 200) return res.data.data;
    return null;
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    const errMsg = err.response?.data.message || "Something went wrong";
    errorToast(errMsg);
    throw err;
  }
};

export {
  proceedToCheckoutHelper,
  userTrackOrderHelper,
  completeCheckoutHelper,
};
