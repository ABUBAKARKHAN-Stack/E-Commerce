import ProductForm from "@/components/reusable/admin/ProductForm";

const AdminAddProduct = () => {
  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col border-b-2 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-950 dark:text-white">
            Add New Product
          </h1>
          <p className="font-mono text-sm font-bold text-gray-900 dark:text-gray-300">
            Add products to your store efficiently! 🚀
          </p>
        </div>
      </div>

      <div className="rounded-xl border-4 bg-gradient-to-b from-[#ffffff] via-[#E5E7EB] to-[#F3F4F6] px-4 py-8 dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
        <ProductForm />
      </div>
    </div>
  );
};

export default AdminAddProduct;
