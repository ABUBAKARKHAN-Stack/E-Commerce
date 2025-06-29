import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import {
    getProducts,
    getTopCategories,
    getSingleProduct,
    getTopRatedProducts,
    getCategories
} from '@/API/userApi'
import { IProduct } from "@/types/main.types";
import { AxiosError } from "axios";



type ProductContextType = {
    loading: string | null;
    getAllProducts: (query?: any) => Promise<any>;
    productsData: IProduct[] | null;
    setProductsData: (products: IProduct[]) => void;
    getProduct: (productId: string) => Promise<any>;
    fetchCategories: () => Promise<void>;
    categories: string[] | null;
    fetchTopCategories: () => Promise<void>;
    topCategories: string[] | null;
    fetchTopRatedProducts: () => Promise<void>;
    topRatedProducts: any[] | null;
};

const ProductContext = createContext<ProductContextType | null>(null);

const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<null | "get-products" | "get-product" | "categories" | "top-categories" | "top-products">(null);
    const [categories, setCategories] = useState<string[] | null>(null);
    const [topCategories, setTopCategories] = useState<string[] | null>(null);
    const [topRatedProducts, setTopRatedProducts] = useState<any[] | null>(null);
    const [productsData, setProductsData] = useState<IProduct[] | null>(null);


    const getAllProducts = async (query?: any) => {
        try {
            setLoading("get-products")
            const res = await getProducts(query);
            const products = res.data?.data?.products;
            return products;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error("Failed to fetch products:", axiosError.message);
        } finally {
            setLoading(null)
        }
    };

    const getProduct = async (productId: string) => {
        try {
            setLoading("get-product")
            const res = await getSingleProduct(productId);
            return res.data.data;
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
            getProduct,
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
