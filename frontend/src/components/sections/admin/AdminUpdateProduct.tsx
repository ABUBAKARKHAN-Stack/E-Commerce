import { useEffect, useState } from "react";
import ProductForm from "@/components/reusable/admin/ProductForm";
import { useParams } from "react-router-dom";
import { useAdminProductContext } from "@/context/adminProductContext";
import { AdminProductLoading } from "@/types/main.types";

const AdminUpdateProduct = () => {
    const { id } = useParams(); 
    const { getProduct, loading } = useAdminProductContext()
    const [product, setProduct] = useState<any>(null);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProduct(id!);
                setProduct(res);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);



    return (
        <div className="px-4 space-y-6">
            <div className="flex border-b-2 flex-col md:flex-row md:items-center md:justify-between py-4">
                <div>
                    <h1 className="text-3xl text-gray-950 dark:text-white font-bold">
                        Update Product
                    </h1>
                    <p className="text-gray-900 dark:text-gray-300 font-bold font-mono text-sm">
                        Modify product details efficiently! ✏️
                    </p>
                </div>
            </div>

            <div className="bg-gradient-to-b px-4 py-8 from-[#ffffff] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b border-4 rounded-xl dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
                    {
                        loading === AdminProductLoading.GET_ONE ? "Loading" : <ProductForm  product={product} />
                    }
            </div>
        </div>
    );
};

export default AdminUpdateProduct;
