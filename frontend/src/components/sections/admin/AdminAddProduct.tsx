import ProductForm from "@/components/reusable/admin/ProductForm";

const AdminAddProduct = () => {
  return (
    <div className="rounded-xl border-2 shadow-lg bg-gradient-to-b from-[#ffffff] via-[#E5E7EB] to-[#F3F4F6] px-4 py-8 dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <ProductForm />
    </div>
  );
};

export default AdminAddProduct;
