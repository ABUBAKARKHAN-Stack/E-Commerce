//* Wishlist Helper Function

import { addToWishList, getWishList, removeFromWishList } from "@/API/userApi";
import { ApiErrorType } from "@/types/main.types";
import { errorToast, successToast } from "@/utils/toastNotifications";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

type WishlistHelperType = {
  productId: string;
  setWishlist: Dispatch<SetStateAction<string[]>>;
};

const addProductIntoWishlistHelper = async ({
  productId,
  setWishlist,
}: WishlistHelperType) => {
  try {
    const res = await addToWishList(productId);
    if (res.status === 200) {
      successToast(res.data.message);
      setWishlist((prev) => [...prev, res.data.data.productId]);
    }
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    const errMsg =
      err?.response?.data?.message || "Error Adding Product into Wishlist";
    errorToast(errMsg);
    throw err;
  }
};

const removeProductFromWishlistHelper = async ({
  setWishlist,
  productId,
}: WishlistHelperType) => {
  try {
    const res = await removeFromWishList(productId);

    if (res.status === 200) {
      successToast(res.data.message);
      setWishlist((prev) => {
        const index = prev.findIndex((id) => id === res.data.data.productId);
        prev.splice(index, 1);
        return [...prev];
      });
    }
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    const errMsg =
      err?.response?.data?.message || "Error Adding Product into Wishlist";
    errorToast(errMsg);
    throw err;
  }
};

const getWishListHelper = async () => {
  try {
    const res = await getWishList();
    if (res.status === 200) {
      const wishlist: string[] = res.data.data.wishlist ?? [];
      return wishlist;
    }
    return null;
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    throw err;
  }
};

export {
  //* Wishlist
  addProductIntoWishlistHelper,
  removeProductFromWishlistHelper,
  getWishListHelper,
};
