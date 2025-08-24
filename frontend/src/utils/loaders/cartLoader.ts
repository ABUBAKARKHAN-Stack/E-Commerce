import { getBulkProducts, getCartDetails } from "@/API/userApi";
import { ApiErrorType, IProduct } from "@/types/main.types";
import { AxiosError } from "axios";
import { ApiError } from "../ApiError";
import { redirect } from "react-router-dom";

const cartLoader = async () => {
  try {
    const res = await getCartDetails();
    const products = res.data.data.products;
    const totalAmount = res.data.data.totalAmount;

    if (res.status === 200) {
      if (products.length > 0 && totalAmount > 0) {
        const productIds = products.map(
          ({ productId }: { productId: string }) => productId,
        );
        const bulk = await getBulkProducts(productIds);
        if (bulk.status === 200) {
          const originalProducts = res.data.data.products;
          const bulkProducts: IProduct[] = bulk.data.data;
          const quantityMap = new Map(
            originalProducts.map(
              ({
                productId,
                quantity,
              }: {
                productId: string;
                quantity: number;
              }) => [productId, quantity],
            ),
          );

          return {
            productsFromCart: bulkProducts.map((product) => ({
              ...product,
              cartedProductQuantity: quantityMap.get(product?._id) || 0,
            })),
            totalAmount,
          };
        }
        throw new ApiError(bulk.status, "Failed to fetch bulk products");
      }
      return {
        productsFromCart: null,
        totalAmount: 0,
      };
    }
    throw new ApiError(res.status, "Unexpected response from cart API");
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    console.log(err);

    const errStatus = err.response?.status || 500;
    const errMsg = err.response?.data.message || "Something went wrong";
    if (errStatus === 401 || errStatus === 403) {
      return redirect("/sign-in");
    }
    throw new ApiError(errStatus, errMsg, err.response?.data);
  }
};

export { cartLoader };
