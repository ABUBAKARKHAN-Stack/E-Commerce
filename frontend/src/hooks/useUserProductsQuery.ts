import {
  fetchBulkProductsHelper,
  fetchCategoriesHelper,
  fetchTopCategoriesHelper,
  fetchTopRatedProductsHelper,
  getAllProductsHelper,
  getProductHelper,
} from "@/helpers/user/products.helper";
import { ApiErrorType, IProduct, QueryKeys } from "@/types/main.types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useUserProductsQuery = () => {
  //* Products Related Queries
  const useAllProducts = (query?: any) => {
    return useQuery<
      | {
          products: IProduct[];
          totalProducts: number;
          totalPages: number;
          limit: number;
          page: number;
        }
      | undefined,
      AxiosError<ApiErrorType>
    >({
      queryKey: [QueryKeys.ALL_PRODUCTS, query],
      queryFn: () => getAllProductsHelper(query),
      placeholderData: keepPreviousData,
      staleTime: 2 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: "always",
      refetchInterval: 3 * 60 * 1000,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(attemptIndex ** 2, 3000),
    });
  };

  const useProduct = (productId: string) => {
    return useQuery<IProduct | null, AxiosError<ApiErrorType>>({
      queryKey: [QueryKeys.PRODUCT, productId],
      queryFn: () => getProductHelper(productId),
      staleTime: 2 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: "always",
      refetchInterval: 3 * 60 * 1000,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(attemptIndex ** 2, 3000),
    });
  };

  const useCategories = () => {
    return useQuery<string[] | null, AxiosError<ApiErrorType>>({
      queryKey: [QueryKeys.ALL_CATEGORIES],
      queryFn: fetchCategoriesHelper,
      staleTime: Infinity,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(attemptIndex ** 2, 3000),
    });
  };

  const useTopCategories = () => {
    return useQuery({
      queryKey: [QueryKeys.TOP_CATEGORIES],
      queryFn: fetchTopCategoriesHelper,
      staleTime: Infinity,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(attemptIndex ** 2, 3000),
    });
  };

  const useTopProducts = () => {
    return useQuery({
      queryKey: [QueryKeys.TOP_RATED_PRODUCTS],
      queryFn: fetchTopRatedProductsHelper,
      staleTime: Infinity,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(attemptIndex ** 2, 3000),
    });
  };

  const useBulkProducts = ({
    contextKey,
    productIds,
    isIdsLoaded,
  }: {
    contextKey: string;
    productIds: string[];
    isIdsLoaded: boolean;
  }) => {
    return useQuery({
      queryKey: [contextKey, productIds],
      queryFn: () => fetchBulkProductsHelper(productIds),
      enabled: isIdsLoaded && productIds !== undefined && productIds.length > 0,
      staleTime: Infinity,
      placeholderData: keepPreviousData,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(attemptIndex ** 2, 3000),
    });
  };

  return {
    //* Product Query
    useAllProducts,
    useProduct,
    useCategories,
    useTopCategories,
    useTopProducts,
    useBulkProducts,
  };
};

export { useUserProductsQuery };
