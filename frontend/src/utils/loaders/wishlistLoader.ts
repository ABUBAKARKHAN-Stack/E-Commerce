import { AxiosError } from "axios";
import { ApiError } from "../ApiError";
import { ApiErrorType, IProduct } from "@/types/main.types";
import { getBulkProducts, getWishList } from "@/API/userApi";
import { redirect } from "react-router-dom";

const wishlistLoader = async () => {
  try {
    const res = await getWishList();
    const productsIds: string[] = res.data.data.wishlist;

    if (res.status === 200) {
      if (productsIds.length > 0) {
        const bulk = await getBulkProducts(productsIds);
        if (bulk.status === 200) {
          const products: IProduct[] = bulk.data.data;
          return {
            wishlistedProducts: products,
          };
        }
        throw new ApiError(bulk.status, "Failed to fetch bulk products");
      }
      return {
        wishlist: [],
      };
    }
    throw new ApiError(res.status, "Unexpected response from wishlist API");
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    const errStatus = err.response?.status || 500;
    const errMsg = err.response?.data.message || "Something went wrong";
    if (errStatus === 401 || errStatus === 403) {
      return redirect("/sign-in");
    }
    throw new ApiError(errStatus, errMsg, err.response?.data);
  }
};

export { wishlistLoader };
