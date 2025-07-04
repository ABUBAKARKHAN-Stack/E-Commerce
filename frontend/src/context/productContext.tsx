import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

import {
    getProducts,
    getTopCategories,
    getSingleProduct,
    getTopRatedProducts,
    getCategories,
    addToWishList,
    getWishList as getWishListApi,
    removeFromWishList
} from '@/API/userApi'
import { ApiError, IProduct } from "@/types/main.types";
import { AxiosError } from "axios";
import { errorToast, successToast } from "@/utils/toastNotifications";



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
    removeProductFromWishlist: (productId: string) => Promise<void>;
    getWishList: () => Promise<void>;
    wishlist: string[];
    setWishlist: Dispatch<SetStateAction<string[]>>;
    totalProducts: number;
    setTotalProducts: Dispatch<SetStateAction<number>>
};

const ProductContext = createContext<ProductContextType | null>(null);

const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<null | "get-products" | "get-product" | "categories" | "top-categories" | "top-products">(null);
    const [categories, setCategories] = useState<string[] | null>(null);
    const [topCategories, setTopCategories] = useState<string[] | null>(null);
    const [topRatedProducts, setTopRatedProducts] = useState<any[] | null>(null);
    const [productsData, setProductsData] = useState<IProduct[]>([]);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);

    const getAllProducts = async (query?: any) => {
        try {
            setLoading("get-products")
            const res = await getProducts(query);
            const products = res.data?.data?.products;
            const totalProducts = res.data.data.totalProducts;
            setTotalProducts(totalProducts);
            return products
        } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            console.error("Failed to fetch products:", axiosError.message);
        } finally {
            setLoading(null)
        }
    };

    const getProduct = async (productId: string) => {
        try {
            setLoading("get-product")
            const res = await getSingleProduct(productId);
            if (res.status === 200) return res.data.data;
            return null;

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(null)
        }
    };

    const fetchCategories = async () => {
        try {
            setLoading("categories")
            const res = await getCategories();
            setCategories(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(null)
        }
    }

    const fetchTopCategories = async () => {
        try {
            setLoading("top-categories")
            const res = await getTopCategories();
            setTopCategories(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(null)
        }
    }

    const fetchTopRatedProducts = async () => {
        try {
            setLoading("top-products");
            const res = await getTopRatedProducts();
            setTopRatedProducts(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(null)
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchTopCategories();
        fetchTopRatedProducts();
    }, [])

    const addProductIntoWishlist = async (productId: string) => {
        try {
            const res = await addToWishList(productId);
            if (res.status === 200) {
                successToast(res.data.message);
                setWishlist((prev) => [...prev, res.data.data.productId])
            }
        } catch (error) {
            const err = error as AxiosError<ApiError>;
            const errMsg = err?.response?.data?.message || "Error Adding Product into Wishlist";
            errorToast(errMsg)
        }
    }

    const removeProductFromWishlist = async (productId: string) => {
        try {
            const res = await removeFromWishList(productId);
            console.log(res.data.data);

            if (res.status === 200) {
                successToast(res.data.message);
                setWishlist((prev) => {
                    const index = prev.findIndex((id) => id === res.data.data.productId);
                    console.log(index);

                    prev.splice(index, 1)
                    return [...prev]
                })
            }
        } catch (error) {
            const err = error as AxiosError<ApiError>;
            const errMsg = err?.response?.data?.message || "Error Adding Product into Wishlist";
            errorToast(errMsg)
        }
    }

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
    }

    useEffect(() => {
        getWishList();
    }, [])

    return (
        <ProductContext.Provider value={{
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
            totalProducts,
            setTotalProducts,
            loading
        }}>
            {children}
        </ProductContext.Provider>
    );
};

const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("useProductContext must be used within a ProductProvider");
    return context;
};


export {
    ProductProvider,
    useProductContext
};
