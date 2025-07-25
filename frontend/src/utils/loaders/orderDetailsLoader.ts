import { getBulkProducts, getConfirmedOrderDetails, getPendingOrderDetails } from "@/API/userApi"
import { ApiErrorType, IProduct } from "@/types/main.types";
import { AxiosError } from "axios";
import { ApiError } from "../ApiError";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

const pendingOrderDetailsLoader = async () => {
    try {
        const res = await getPendingOrderDetails();
        if (res.status === 200) {
            const orderId = res.data.data.orderId;
            const cart = res.data.data.cart;
            const productIds = cart.products.map(({ productId }: { productId: string }) => productId);
            const totalAmount = cart.totalAmount;
            const bulk = await getBulkProducts(productIds);
            const bulkProducts: IProduct[] = bulk.data.data;
            if (bulk.status === 200) {
                const originalProducts = cart.products;
                const quantityMap = new Map(
                    originalProducts.map(({ productId, quantity }: { productId: string, quantity: number }) => [productId, quantity])
                );
                return {
                    orderId,
                    products: bulkProducts.map((product) => ({
                        name: product.name,
                        orderedProductQuantity: quantityMap.get(product._id),
                        thumbnail: product.thumbnails[0],
                        price: product.price,
                        category: product.category
                    })),
                    totalAmount
                }
            }
            throw new ApiError(bulk.status, "Failed to fetch bulk products");
        }

        throw new ApiError(res.status, "Unexpected response from Checkout API");

    } catch (error) {
        const err = error as AxiosError<ApiErrorType>;
        const errStatus = err.response?.status || 500
        const errMsg = err.response?.data.message || "Something went wrong";
        if (errStatus === 404) return redirect("/cart");
        if (errStatus === 401 || errStatus === 403) {
            return redirect("/sign-in");
        }
        throw new ApiError(errStatus, errMsg, err.response?.data);
    }
}

const confirmOrderDetailsLoader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const orderId = url.searchParams.get('orderId');
    if (!orderId) return;
    try {
        const res = await getConfirmedOrderDetails(orderId);
        const confirmedAt = res.data.data.confirmedAt; 
        const orderStatus = res.data.data.status;
               

        if (res.status === 200) {
            const orderId = res.data.data.orderId;
            const cart = res.data.data.cart;
            const productIds = cart.products.map(({ productId }: { productId: string }) => productId);
            const totalAmount = cart.totalAmount;
            const bulk = await getBulkProducts(productIds);
            const bulkProducts: IProduct[] = bulk.data.data;
            if (bulk.status === 200) {
                const originalProducts = cart.products;
                const quantityMap = new Map(
                    originalProducts.map(({ productId, quantity }: { productId: string, quantity: number }) => [productId, quantity])
                );
                return {
                    orderId,
                    products: bulkProducts.map((product) => ({
                        name: product.name,
                        orderedProductQuantity: quantityMap.get(product._id),
                        price: product.price,
                    })),
                    totalAmount,
                    confirmedAt,
                    orderStatus
                }
            }
            throw new ApiError(bulk.status, "Failed to fetch bulk products");
        }

        throw new ApiError(res.status, "Unexpected response from Confirmed Order API");

    } catch (error) {
        const err = error as AxiosError<ApiErrorType>;
        const errStatus = err.response?.status || 500
        const errMsg = err.response?.data.message || "Something went wrong";
        if (errStatus === 401 || errStatus === 403) {
            return redirect("/sign-in");
        }
        throw new ApiError(errStatus, errMsg, err.response?.data);
    }


}

export {
    pendingOrderDetailsLoader,
    confirmOrderDetailsLoader
}