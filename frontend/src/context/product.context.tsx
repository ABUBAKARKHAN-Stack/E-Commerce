import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import {
  proceedToCheckout as proceedToCheckoutApi,
  completeCheckout as completeCheckoutApi,
} from "@/API/userApi";
import {
  ApiErrorType,
  CompleteCheckoutBody,
  IProduct,
  UserProductsLoadingStates,
} from "@/types/main.types";
import { AxiosError } from "axios";
import { errorToast } from "@/utils/toastNotifications";
import { useUserProductsQuery } from "@/hooks/useUserProductsQuery";
import { UseQueryResult } from "@tanstack/react-query";

type ProductContextType = {
  useAllProducts: (query?: any) => UseQueryResult<
    | {
        products: IProduct[];
        totalProducts: number;
        totalPages: number;
        limit: number;
        page: number;
      }
    | undefined,
    AxiosError<ApiErrorType>
  >;
  productsData: IProduct[] | null;
  setProductsData: Dispatch<SetStateAction<IProduct[]>>;
  useProduct: (
    productId: string,
  ) => UseQueryResult<IProduct | null, AxiosError<ApiErrorType>>;
  useCategories: () => UseQueryResult<
    string[] | null,
    AxiosError<ApiErrorType>
  >;
  useTopCategories: () => UseQueryResult<string[] | null, Error>;
  useTopProducts: () => UseQueryResult<IProduct[] | null, Error>;
  useBulkProducts: ({
    contextKey,
    productIds,
    isIdsLoaded,
  }: {
    contextKey: string;
    productIds: string[];
    isIdsLoaded: boolean;
  }) => UseQueryResult<IProduct[] | null, Error>;

  completeCheckout: (
    checkoutBody: CompleteCheckoutBody,
  ) => Promise<{ clientSecret: string; orderId: string }>;
};

const ProductContext = createContext<ProductContextType | null>(null);

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [productsData, setProductsData] = useState<IProduct[]>([]);

  const {
    useAllProducts,
    useProduct,
    useCategories,
    useTopCategories,
    useTopProducts,
    useBulkProducts,
  } = useUserProductsQuery(); //* Custom Hook For Managing Products Queries/Mutations

  //* Order Related Functions

  const completeCheckout = async (checkoutBody: CompleteCheckoutBody) => {
    try {
      const res = await completeCheckoutApi(checkoutBody);
      if (res.status === 200) return res.data.data;
    } catch (error) {
      const err = error as AxiosError<ApiErrorType>;
      const errMsg = err.response?.data.message || "Something went wrong";
      errorToast(errMsg);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        useAllProducts,
        useProduct,
        setProductsData,
        productsData,
        useCategories,
        useTopCategories,
        useTopProducts,
        useBulkProducts,

        completeCheckout,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProductContext must be used within a ProductProvider");
  return context;
};

export { ProductProvider, useProductContext };
