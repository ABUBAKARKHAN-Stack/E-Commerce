import { getSingleOrder } from "@/API/adminApi";
import { getBulkProducts } from "@/API/userApi";
import { ApiErrorType, IOrder, IProduct } from "@/types/main.types";
import { ApiError } from "@/utils/ApiError";
import { AxiosError } from "axios";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

const adminOrderDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
    const { orderId } = params;
    if (!orderId) return;
    try {
        const res = await getSingleOrder(orderId);

        if (res.status === 200) {
            const confirmedAt = res.data.data.confirmedAt;
            const orderStatus = res.data.data.status;
            const order = res.data.data;
            const orderId = order.orderId;
            const cancelledAt = order.cancelledAt;
            const shippingAddress = order.shippingAddress;
            const paymentStatus = order.paymentStatus;
            const paymentMethod = order.paymentMethod;
            const refund = order.refund;
            const shippingMethod = order.shippingMethod;
            const shipping = order.shipping;
            const isDelivered = order.isDelivered;
            const cart = order.cart;
            const deliveryDate = order.deliveryDate;
            const productIds = cart.products.map(
                ({ productId }: { productId: string }) => productId,
            );
            const totalAmount = cart.totalAmount;
            const orderPlaceAt = order.createdAt;
            const bulk = await getBulkProducts(productIds);
            const bulkProducts: IProduct[] = bulk.data.data;
            if (bulk.status === 200) {
                const originalProducts = cart.products;
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
                    orderId,
                    products: bulkProducts.map((product) => ({
                        name: product.name,
                        orderedProductQuantity: quantityMap.get(product._id),
                        price: product.price,
                        thumbnail: product.thumbnails[0],
                    })),
                    totalAmount,
                    confirmedAt,
                    orderStatus,
                    cancelledAt,
                    shippingAddress,
                    shippingMethod,
                    shipping,
                    paymentStatus,
                    refund,
                    paymentMethod,
                    deliveryDate,
                    isDelivered,
                    orderPlaceAt,
                };
            }
            throw new ApiError(bulk.status, "Failed to fetch bulk products");
        }

        throw new ApiError(
            res.status,
            "Unexpected response from Admin Order Details API",
        );
    } catch (error) {
        const err = error as AxiosError<ApiErrorType>;
        const errStatus = err.response?.status || 500;
        const errMsg = err.response?.data.message || "Something went wrong";
        if (errStatus === 401 || errStatus === 403) {
            return redirect("/admin/sign-in");
        }
        throw new ApiError(errStatus, errMsg, err.response?.data);
    }
}

export {
    adminOrderDetailsLoader
}