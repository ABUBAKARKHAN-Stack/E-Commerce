import ProductForm from "@/components/reusable/admin/ProductForm";
import { useLoaderData } from "react-router-dom";
import { IProduct } from "@/types/main.types";

const AdminUpdateProduct = () => {
  const product: IProduct = useLoaderData();

  return (
    <div className="rounded-xl border-2 bg-gradient-to-b from-[#ffffff] via-[#E5E7EB] to-[#F3F4F6] px-4 py-8 shadow-lg dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <ProductForm product={product} />
    </div>
  );
};

export default AdminUpdateProduct;
