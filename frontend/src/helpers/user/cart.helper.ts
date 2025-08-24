//* Cart Helper Functions

import {
  addToCart,
  getCartDetails,
  removeFromCart,
  updateCart,
} from "@/API/userApi";
import { ApiErrorType, CartDetails } from "@/types/main.types";
import { errorToast, successToast } from "@/utils/toastNotifications";
import { AxiosError } from "axios";

type CartHelperType = {
  productId: string;
  quantity: number;
};

const addToCartHelper = async ({ productId, quantity }: CartHelperType) => {
  try {
    const res = await addToCart(productId, quantity);
    if (res.status === 200) {
      successToast(res.data.message);
    }
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    const errMsg =
      err?.response?.data?.message || "Error Adding Product into Cart";
    errorToast(errMsg);
    throw err;
  }
};

const updateCartHelper = async ({ productId, quantity }: CartHelperType) => {
  try {
    const res = await updateCart(productId, quantity);
    if (res.status === 200) {
      successToast(res.data.message);
    }
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    const errMsg = err?.response?.data?.message || "Error Updating Cart";
    errorToast(errMsg);
    throw err;
  }
};

const removeFromCartHelper = async (productId: string) => {
  try {
    const res = await removeFromCart(productId);
    if (res.status === 202) {
      successToast("Product Removed from cart");
    }
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    const errMsg =
      err?.response?.data?.message || "Error Removing Product into Cart";
    errorToast(errMsg);
    throw err;
  }
};

const getCartDetailsHelper = async () => {
  try {
    const res = await getCartDetails();

    if (res.status === 200) {
      const totalAmount = res.data.data.totalAmount;
      const products = res.data.data.products;
      const payload: CartDetails = {
        totalAmount,
        products,
      };
      return payload;
    }

    return null;
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    throw err;
  }
};

export {
  //* Cart
  addToCartHelper,
  updateCartHelper,
  removeFromCartHelper,
  getCartDetailsHelper,
};
