import {
  getBulkProducts,
  getCategories,
  getProducts,
  getSingleProduct,
  getTopCategories,
  getTopRatedProducts,
} from "@/API/userApi";
import { ApiErrorType, IProduct } from "@/types/main.types";

import { AxiosError } from "axios";

//* Products Helper Function
const getAllProductsHelper = async (query?: any) => {
  try {
    const res = await getProducts(query);
    if (res.status === 200) {
      const products: IProduct[] = res.data?.data?.products ?? [];
      const totalProducts: number = res.data?.data?.totalProducts ?? 0;
      const totalPages: number = res.data?.data?.totalPages ?? 0;
      const limit: number = res.data?.data?.limit ?? 0;
      const page: number = res.data?.data?.page ?? 0;
      return {
        products,
        totalProducts,
        totalPages,
        limit,
        page,
      };
    }
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorType>;
    throw axiosError;
  }
};

const getProductHelper = async (productId: string) => {
  try {
    const res = await getSingleProduct(productId);
    if (res.status === 200) return res.data.data;
    return null;
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    throw err;
  }
};

const fetchCategoriesHelper = async () => {
  try {
    const res = await getCategories();
    if (res.status === 200) {
      const categories: string[] = res.data.data;
      return categories ?? [];
    }
    return null;
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    throw err;
  }
};

const fetchTopCategoriesHelper = async () => {
  try {
    const res = await getTopCategories();
    if (res.status === 200) {
      const topCategories: string[] = res.data.data;
      return topCategories ?? [];
    }

    return null;
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    throw err;
  }
};

const fetchTopRatedProductsHelper = async () => {
  try {
    const res = await getTopRatedProducts();
    if (res.status === 200) {
      const topProducts: IProduct[] = res.data.data;
      return topProducts;
    }
    return null;
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    throw err;
  }
};

const fetchBulkProductsHelper = async (productIds: string[]) => {
  try {
    const bulk = await getBulkProducts(productIds);
    if (bulk.status === 200) {
      const products: IProduct[] = bulk.data.data;
      return products ?? [];
    }
    return null;
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    throw err;
  }
};

export {
  //* Products
  getAllProductsHelper,
  getProductHelper,
  fetchCategoriesHelper,
  fetchTopCategoriesHelper,
  fetchTopRatedProductsHelper,
  fetchBulkProductsHelper,
};
