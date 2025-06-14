import ProductForm from "@/components/reusable/ProductForm";

const AdminAddProduct = () => {

    return (
        <div className="px-4 space-y-6">
            <div className="flex border-b-2 flex-col md:flex-row md:items-center md:justify-between py-4">
                <div>
                    <h1 className="text-3xl text-gray-950 dark:text-white font-bold">Add New Product</h1>
                    <p className="text-gray-900 dark:text-gray-300 font-bold font-mono text-sm">Add products to your store efficiently! 🚀</p>
                </div>
            </div>

            <div className="bg-gradient-to-b px-4 py-8 from-[#ffffff] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b border-4 rounded-xl dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
                <ProductForm />
            </div>


        </div>
    );
};

export default AdminAddProduct;