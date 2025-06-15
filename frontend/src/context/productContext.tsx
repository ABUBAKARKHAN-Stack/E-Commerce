import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import { z } from "zod";
import { productSchema } from "@/schemas";
import { errorToast, successToast } from "@/utils/toastNotifications";
import { createProduct, getProducts, deleteProduct as removeProduct, getSingleProduct, updateProduct, removeProductThumbnail } from "@/API/adminApi";

type ProductContextType = {
    loadingProducts: boolean;
    products: any[] | null;
    getAllProducts: () => Promise<void>;
};

type AdminProductContextType = ProductContextType & {
    addingProduct: boolean;
    deletingProduct: boolean;
    addProduct: (productData: z.infer<typeof productSchema>) => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
    getProduct: (productId: string) => Promise<any>;
    editProduct: (productId: string, updatedData: any) => Promise<void>;
    removeThumbnail: (productId: string, thumbnailIndex: number) => Promise<void>;
};

const ProductContext = createContext<ProductContextType | null>(null);
const AdminProductContext = createContext<AdminProductContextType | null>(null);

const ProductProvider = ({ children }: { children: ReactNode }) => {
    const { role } = useAuthContext();
    const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
    const [products, setProducts] = useState<any[] | null>(null);
    const [addingProduct, setAddingProduct] = useState<boolean>(false);
    const [deletingProduct, setDeletingProduct] = useState<boolean>(false);
    const isAdmin = role === "admin";

    const getAllProducts = async () => {
        try {
            setLoadingProducts(true);
            const res = await getProducts();
            setProducts(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingProducts(false);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    if (isAdmin) {
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
                setAddingProduct(true);
                const res = await createProduct(formData);
                successToast(res.data.message);
                await getAllProducts();
            } catch (error: any) {
                const errorMsg = error.response?.data?.message || "An error occurred";
                errorToast(errorMsg);
            } finally {
                setAddingProduct(false);
            }
        };

        const deleteProduct = async (productId: string) => {
            try {
                setDeletingProduct(true);
                const res = await removeProduct(productId);
                successToast(res.data.message);
                await getAllProducts();
            } catch (error) {
                errorToast("Failed to delete product");
            } finally {
                setDeletingProduct(false);
            }
        };

        const getProduct = async (productId: string) => {
            try {
                const res = await getSingleProduct(productId);

                return res.data.data;
            } catch (error) {
                console.error(error);
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
                const res = await updateProduct(productId, formData);
                successToast(res.data.message);
                await getAllProducts();
                await getProduct(productId);
            } catch (error: any) {
               const errorMsg = error.response?.data?.message || "An error occurred";
               errorToast(errorMsg);
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


        return (
            <AdminProductContext.Provider value={{
                loadingProducts, products, getAllProducts,
                addingProduct, deletingProduct, addProduct, deleteProduct, getProduct, editProduct,
                removeThumbnail
            }}>
                {children}
            </AdminProductContext.Provider>
        );
    }

    return (
        <ProductContext.Provider value={{ loadingProducts, products, getAllProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("useProductContext must be used within a ProductProvider");
    return context;
};

const useAdminProductContext = () => {
    const context = useContext(AdminProductContext);
    if (!context) throw new Error("useAdminProductContext must be used within a ProductProvider as Admin");
    return context;
};

export { ProductProvider, useProductContext, useAdminProductContext };
