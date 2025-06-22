import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import {
    getProducts,
    getTopCategories,
    getSingleProduct,
    getTopRatedProducts
} from '@/API/userApi'

type ProductContextType = {
    loading: string | null;
    products: any[] | null;
    getAllProducts: () => Promise<void>;
    getProduct: (productId: string) => Promise<any>
    fetchCategories: () => Promise<void>;
    categories: string[] | null;
    topRatedProducts: any[] | null;
    fetchTopRatedProducts: () => Promise<void>;


};


const ProductContext = createContext<ProductContextType | null>(null);

const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<null | "get-products" | "get-product" | "top-categories" | "top-products">(null);
    const [products, setProducts] = useState<any[] | null>(null);
    const [categories, setCategories] = useState<string[] | null>(null)
    const [topRatedProducts, setTopRatedProducts] = useState<any[] | null>(null)


    const getAllProducts = async () => {
        try {
            setLoading("get-products")
            const res = await getProducts();
            setProducts(res.data.data);
        } catch (error) {
            console.error(error);
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

    useEffect(() => {
        getAllProducts();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading("top-categories")
            const res = await getTopCategories();
            setCategories(res.data.data);
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
        fetchTopRatedProducts()
    }, [])

    return (
        <ProductContext.Provider value={{
            products,
            getAllProducts,
            fetchCategories,
            categories,
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
