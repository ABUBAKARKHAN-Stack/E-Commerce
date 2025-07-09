import { getBulkProducts, getCartDetails } from "@/API/userApi";
import { ApiError as ApiErrorType, IProduct } from "@/types/main.types";
import { AxiosError } from "axios";
import { ApiError } from "../ApiError";

const cartLoader = async () => {
    try {
        const res = await getCartDetails();
        if (res.status === 200) {
            const productIds = res.data.data.products.map(({ productId }: { productId: string }) => productId);
            const totalAmount = res.data.data.totalAmount;
            const bulk = await getBulkProducts(productIds);
            if (bulk.status === 200) {
                const originalProducts = res.data.data.products;
                const bulkProducts: IProduct[] = bulk.data.data;
                const quantityMap = new Map(
                    originalProducts.map(({ productId, quantity }: { productId: string, quantity: number }) => [productId, quantity])
                )

                return {
                    productsFromCart: bulkProducts.map((product) => ({
                        ...product,
                        cartedProductQunatity: quantityMap.get(product._id) || 0
                    })),
                    totalAmount
                }
            }
            throw new ApiError(bulk.status, "Failed to fetch bulk products");
        }
    } catch (error) {
        const err = error as AxiosError<ApiErrorType>;
        const errStatus = err.response?.status || 500
        const errMsg = err.response?.data.message || "Something went wrong";
        throw new ApiError(errStatus, errMsg, err.response?.data)
    }
}

export {
    cartLoader
}