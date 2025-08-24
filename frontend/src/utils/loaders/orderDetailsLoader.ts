import {
  getBulkProducts,
  getConfirmedOrderDetails,
  getPendingOrderDetails,
  getSingleOrder,
  userTrackOrder,
} from "@/API/userApi";
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
      const productIds = cart.products.map(
        ({ productId }: { productId: string }) => productId,
      );
      const totalAmount = cart.totalAmount;
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
            thumbnail: product.thumbnails[0],
            price: product.price,
            category: product.category,
          })),
          totalAmount,
        };
      }
      throw new ApiError(bulk.status, "Failed to fetch bulk products");
    }

    throw new ApiError(res.status, "Unexpected response from Checkout API");
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    const errStatus = err.response?.status || 500;
    const errMsg = err.response?.data.message || "Something went wrong";
    if (errStatus === 404) return redirect("/cart");
    if (errStatus === 401 || errStatus === 403) {
      return redirect("/sign-in");
    }
    throw new ApiError(errStatus, errMsg, err.response?.data);
  }
};

const confirmOrderDetailsLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId");
  if (!orderId) return;
  try {
    const res = await getConfirmedOrderDetails(orderId);
    const confirmedAt = res.data.data.confirmedAt;
    const orderStatus = res.data.data.status;
    const shippingMethod = res.data.data.shippingMethod;
    const shipping = res.data.data.shipping;

    if (res.status === 200) {
      const orderId = res.data.data.orderId;
      const cart = res.data.data.cart;
      const deliveryDate = res.data.data.deliveryDate;
      const productIds = cart.products.map(
        ({ productId }: { productId: string }) => productId,
      );
      const totalAmount = cart.totalAmount;
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
          })),
          totalAmount,
          confirmedAt,
          orderStatus,
          shippingMethod,
          shipping,
          deliveryDate,
        };
      }
      throw new ApiError(bulk.status, "Failed to fetch bulk products");
    }

    throw new ApiError(
      res.status,
      "Unexpected response from Confirmed Order API",
    );
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

const userTrackOrderLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId");
  if (!orderId) return;
  try {
    const res = await userTrackOrder(orderId);
    const confirmedAt = res.data.data.confirmedAt;
    const orderStatus = res.data.data.status;
    const shippingMethod = res.data.data.shippingMethod;
    const shipping = res.data.data.shipping;

    if (res.status === 200) {
      const orderId = res.data.data.orderId;
      const cart = res.data.data.cart;
      const deliveryDate = res.data.data.deliveryDate;
      const productIds = cart.products.map(
        ({ productId }: { productId: string }) => productId,
      );
      const totalAmount = cart.totalAmount;
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
          })),
          totalAmount,
          confirmedAt,
          orderStatus,
          shippingMethod,
          shipping,
          deliveryDate,
        };
      }
      throw new ApiError(bulk.status, "Failed to fetch bulk products");
    }

    throw new ApiError(res.status, "Unexpected response from Track Order API");
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

const singleOrderDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
  const { orderId } = params;
  if (!orderId) return;
  try {
    const res = await getSingleOrder(orderId);
    const confirmedAt = res.data.data.confirmedAt;
    const orderStatus = res.data.data.status;

    if (res.status === 200) {
      const order = res.data.data;
      const orderId = order.orderId;
      const shippingAddress = order.shippingAddress;
      const deliveryDate = order.deliveryDate;
      const paymentStatus = order.paymentStatus;
      const paymentMethod = order.paymentMethod;
      const refund = order.refund;
      const shippingMethod = order.shippingMethod;
      const shipping = order.shipping;
      const isDelivered = order.isDelivered;
      const cart = order.cart;
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
      "Unexpected response from Order Details API",
    );
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

export {
  pendingOrderDetailsLoader,
  confirmOrderDetailsLoader,
  userTrackOrderLoader,
  singleOrderDetailsLoader,
};
