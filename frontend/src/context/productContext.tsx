import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getProducts,
  getTopCategories,
  getSingleProduct,
  getTopRatedProducts,
  getCategories,
  addToWishList,
  getWishList as getWishListApi,
  removeFromWishList,
  addToCart as addToCartApi,
  removeFromCart as removeFromCartApi,
  updateCart as updateCartApi,
  getCartDetails as getCartDetailsApi,
  proceedToCheckout as proceedToCheckoutApi,
  completeCheckout as completeCheckoutApi,
} from "@/API/userApi";
import {
  ApiErrorType,
  CompleteCheckoutBody,
  IProduct,
} from "@/types/main.types";
import { AxiosError } from "axios";
import { errorToast, successToast } from "@/utils/toastNotifications";
import { useLocation } from "react-router-dom";

type CartDetails = {
  products: { products: any[]; totalAmount: number }[];
  totalAmount: number;
};

type ProductContextType = {
  loading: string | null;
  getAllProducts: (query?: any) => Promise<any>;
  productsData: IProduct[] | null;
  setProductsData: Dispatch<SetStateAction<IProduct[]>>;
  getProduct: (productId: string) => Promise<IProduct | null>;
  fetchCategories: () => Promise<void>;
  categories: string[] | null;
  fetchTopCategories: () => Promise<void>;
  topCategories: string[] | null;
  fetchTopRatedProducts: () => Promise<void>;
  topRatedProducts: any[] | null;
  addProductIntoWishlist: (productId: string) => Promise<void>;
  removeProductFromWishlist: (
    productId: string,
    revalidate: () => void,
  ) => Promise<void>;
  getWishList: () => Promise<void>;
  wishlist: string[];
  setWishlist: Dispatch<SetStateAction<string[]>>;
  totalProducts: number;
  setTotalProducts: Dispatch<SetStateAction<number>>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string, revalidate: () => void) => Promise<void>;
  updateCart: (
    productId: string,
    quantity: number,
    revalidate: () => void,
  ) => Promise<void>;
  getCartDetails: () => Promise<CartDetails | null>;
  cartDetails: CartDetails | {};
  setCartDetails: Dispatch<SetStateAction<CartDetails | {}>>;
  cartProductsCount: number;
  setCartProductsCount: Dispatch<SetStateAction<number>>;
  proceedToCheckout: (navigate: (path: string) => void) => Promise<void>;
  completeCheckout: (
    checkoutBody: CompleteCheckoutBody,
  ) => Promise<{ clientSecret: string; orderId: string }>;
};

const ProductContext = createContext<ProductContextType | null>(null);

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<
    | null
    | "get-products"
    | "get-product"
    | "categories"
    | "top-categories"
    | "top-products"
  >(null);
  const [categories, setCategories] = useState<string[] | null>(null);
  const [topCategories, setTopCategories] = useState<string[] | null>(null);
  const [topRatedProducts, setTopRatedProducts] = useState<any[] | null>(null);
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [cartDetails, setCartDetails] = useState<CartDetails | {}>({});
  const [cartProductsCount, setCartProductsCount] = useState(0);
  //* Products Related Functions

  const getAllProducts = async (query?: any) => {
    try {
      setLoading("get-products");
      const res = await getProducts(query);
      const products = res.data?.data?.products;
      const totalProducts = res.data.data.totalProducts;
      setTotalProducts(totalProducts);
      return products;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorType>;
      console.error("Failed to fetch products:", axiosError.message);
    } finally {
      setLoading(null);
    }
  };

  const getProduct = async (productId: string) => {
    try {
      setLoading("get-product");
      const res = await getSingleProduct(productId);
      if (res.status === 200) return res.data.data;
      return null;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading("categories");
      const res = await getCategories();
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(null);
    }
  };

  const fetchTopCategories = async () => {
    try {
      setLoading("top-categories");
      const res = await getTopCategories();
      setTopCategories(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(null);
    }
  };

  const fetchTopRatedProducts = async () => {
    try {
      setLoading("top-products");
      const res = await getTopRatedProducts();
      setTopRatedProducts(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    console.log("Calling All Categories");

    fetchCategories();

    console.log("Calling Top Category , Top Rated Products");
    fetchTopCategories();
    fetchTopRatedProducts();
  }, []);

  //* Wishlist Related Functions

  const addProductIntoWishlist = async (productId: string) => {
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
    }
  };

  const removeProductFromWishlist = async (
    productId: string,
    revalidate: () => void,
  ) => {
    try {
      const res = await removeFromWishList(productId);

      if (res.status === 200) {
        successToast(res.data.message);
        setWishlist((prev) => {
          const index = prev.findIndex((id) => id === res.data.data.productId);
          prev.splice(index, 1);
          return [...prev];
        });
        if (window.location.pathname === "/wishlist") revalidate();
      }
    } catch (error) {
      const err = error as AxiosError<ApiErrorType>;
      const errMsg =
        err?.response?.data?.message || "Error Adding Product into Wishlist";
      errorToast(errMsg);
    }
  };

  const getWishList = async () => {
    try {
      const res = await getWishListApi();
      if (res.status === 200) {
        setWishlist(res.data.data.wishlist);
      }
    } catch (error) {
      console.log(error);
      setWishlist([]);
    }
  };

  useEffect(() => {
    console.log("Calling Wishlist");
    getWishList();
  }, []);

  //* Cart Related Functions

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const res = await addToCartApi(productId, quantity);

      if (res.status === 200) {
        successToast(res.data.message);
        const cart = await getCartDetails();
        setCartProductsCount(cart?.products?.length || 0);
      }
    } catch (error) {
      const err = error as AxiosError<ApiErrorType>;
      const errMsg = err.response?.data.message || "Something went wrong";
      errorToast(errMsg);
    }
  };

  const updateCart = async (
    productId: string,
    quantity: number,
    revalidate: () => void,
  ) => {
    try {
      const res = await updateCartApi(productId, quantity);
      if (res.status === 200) {
        successToast(res.data.message);
        revalidate();
      }
    } catch (error) {
      const err = error as AxiosError<ApiErrorType>;
      const errMsg = err.response?.data.message || "Something went wrong";
      errorToast(errMsg);
    }
  };

  const removeFromCart = async (productId: string, revalidate: () => void) => {
    try {
      const res = await removeFromCartApi(productId);
      if (res.status === 202) {
        successToast("Product Removed from cart");
        revalidate();
        const cart = await getCartDetails();
        setCartProductsCount(cart?.products?.length || 0);
      }
    } catch (error) {
      const err = error as AxiosError<ApiErrorType>;
      const errMsg = err.response?.data.message || "Something went wrong";
      errorToast(errMsg);
    }
  };

  const getCartDetails = async () => {
    try {
      const res = await getCartDetailsApi();

      if (res.status === 200) {
        const totalAmount = res.data.data.totalAmount as number;
        const products = res.data.data.products as any[];

        const payload = {
          totalAmount,
          products,
        };

        setCartDetails(payload);
        return payload;
      }

      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    console.log("Calling Get Cart Details");
    (async () => {
      const cart = await getCartDetails();
      setCartProductsCount(cart?.products?.length || 0);
    })();
  }, []);

  //* Order Related Functions

  const proceedToCheckout = async (navigate: (path: string) => void) => {
    try {
      const res = await proceedToCheckoutApi();
      if (res.status === 200) navigate("/checkout");
      console.log(res.data.data.orderId);
    } catch (error) {
      const err = error as AxiosError<ApiErrorType>;
      const errMsg = err.response?.data.message || "Something went wrong";
      errorToast(errMsg);
    }
  };

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
        getAllProducts,
        setProductsData,
        productsData,
        fetchCategories,
        categories,
        fetchTopCategories,
        topCategories,
        fetchTopRatedProducts,
        topRatedProducts,
        addProductIntoWishlist,
        removeProductFromWishlist,
        getWishList,
        wishlist,
        setWishlist,
        getProduct,
        addToCart,
        updateCart,
        removeFromCart,
        cartDetails,
        setCartDetails,
        getCartDetails,
        cartProductsCount,
        setCartProductsCount,
        totalProducts,
        setTotalProducts,
        proceedToCheckout,
        completeCheckout,
        loading,
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
