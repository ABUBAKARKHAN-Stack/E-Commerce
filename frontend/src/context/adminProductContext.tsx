import { productSchema } from "@/schemas";
import { z } from "zod";
import React, { createContext, useContext, useEffect, useState } from "react";
import { errorToast, successToast } from "@/utils/toastNotifications";
import {
    createProduct,
    removeProductThumbnail,
    updateProduct,
    deleteProduct as removeProduct
} from "@/API/adminApi";
import { getProducts, getSingleProduct } from '@/API/userApi'
import { AdminProductLoading } from "@/types/main.types";


type AdminProductContextType = {
    addProduct: (productData: z.infer<typeof productSchema>) => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
    getProduct: (productId: string) => Promise<any>;
    getAllProducts: () => Promise<void>;
    editProduct: (productId: string, updatedData: any) => Promise<void>;
    products: any[] | null;
    removeThumbnail: (productId: string, thumbnailIndex: number) => Promise<void>;
    loading: string | null;
};

const AdminProductContext = createContext<AdminProductContextType | null>(null);

const AdminProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<null | AdminProductLoading>(null);
    const [products, setProducts] = useState<any[]>([])


    const getAllProducts = async () => {
        try {
            setLoading(AdminProductLoading.GET_ALL)
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
            setLoading(AdminProductLoading.GET_ONE)
            const res = await getSingleProduct(productId);
            return res.data.data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(null)
        }
    };


    const addProduct = async (data: z.infer<typeof productSchema>) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("quantity", data.quantity.toString());
        formData.append("category", data.category);

        if (Array.isArray(data.thumbnails)) {
            data.thumbnails.forEach((file) => {
                formData.append("thumbnails", file);
            });
        } else {
            console.error("Thumbnails is not an array");
        }

        try {
            setLoading(AdminProductLoading.ADD);
            const res = await createProduct(formData);
            successToast(res.data.message);
            await getAllProducts();
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "An error occurred";
            errorToast(errorMsg);
        } finally {
            setLoading(null);
        }
    };

    const deleteProduct = async (productId: string) => {
        try {
            setLoading(AdminProductLoading.DELETE);
            const res = await removeProduct(productId);
            successToast(res.data.message);
            await getAllProducts();
        } catch (error) {
            errorToast("Failed to delete product");
        } finally {
            setLoading(null);
        }
    };

    const editProduct = async (productId: string, updatedData: any) => {
        const formData = new FormData();
        formData.append("name", updatedData.name);
        formData.append("description", updatedData.description);
        formData.append("price", updatedData.price.toString());
        formData.append("quantity", updatedData.quantity.toString());
        formData.append("category", updatedData.category);
        if (Array.isArray(updatedData.thumbnails)) {
            updatedData.thumbnails.forEach((file: any) => {
                formData.append("thumbnails", file);
            });
        } else {
            console.error("Thumbnails is not an array");
        }

        try {
            setLoading(AdminProductLoading.EDIT);
            const res = await updateProduct(productId, formData);
            successToast(res.data.message);
            await getAllProducts();
            await getProduct(productId);
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "An error occurred";
            errorToast(errorMsg);
        } finally {
            setLoading(null)
        }
    };

    const removeThumbnail = async (productId: string, thumbnailIndex: number) => {
        try {
            const res = await removeProductThumbnail(productId, thumbnailIndex);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])


    return (
        <AdminProductContext.Provider value={{
            products,
            addProduct,
            deleteProduct,
            editProduct,
            getProduct,
            getAllProducts,
            removeThumbnail,
            loading,
        }}>
            {children}
        </AdminProductContext.Provider>
    )
}

const useAdminProductContext = () => {
    const context = useContext(AdminProductContext)
    if (!context) throw new Error("useAdminProductContext must be used within a AdminProductProvider");
    return context;
}

export {
    useAdminProductContext,
    AdminProductProvider
}