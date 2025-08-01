import { useEffect, useState } from "react";
import ProductForm from "@/components/reusable/admin/ProductForm";
import { useParams } from "react-router-dom";
import { useAdminProductContext } from "@/context/adminProductContext";
import { AdminProductLoading } from "@/types/main.types";

const AdminUpdateProduct = () => {
  const { id } = useParams();
  const { getProduct, loading } = useAdminProductContext();
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
    <div className="space-y-6 px-4">
      <div className="flex flex-col border-b-2 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-950 dark:text-white">
            Update Product
          </h1>
          <p className="font-mono text-sm font-bold text-gray-900 dark:text-gray-300">
            Modify product details efficiently! ✏️
          </p>
        </div>
      </div>

      <div className="rounded-xl border-4 bg-gradient-to-b from-[#ffffff] via-[#E5E7EB] to-[#F3F4F6] px-4 py-8 dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
        {loading === AdminProductLoading.GET_ONE ? (
          "Loading"
        ) : (
          <ProductForm product={product} />
        )}
      </div>
    </div>
  );
};

export default AdminUpdateProduct;
