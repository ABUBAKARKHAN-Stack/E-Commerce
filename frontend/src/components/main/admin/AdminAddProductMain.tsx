import { useState } from "react";
import { Layout, SideBar } from "@/components/layout/shared";
import { AdminHeader } from "@/components/layout/admin";
import { AdminAddProduct } from "@/components/sections/admin";
import { DashboardMainHeader } from "@/components/reusable/shared";
import { BoxIcon, PackageIcon } from "lucide-react";

const AdminAddProductMain = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AdminHeader setIsOpen={setIsOpen} />
      <div className="my-5 flex">
        <SideBar isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} />
        <Layout>
          <div className="space-y-10 px-4">
            <DashboardMainHeader
              mainIcon={<BoxIcon className="md:size-8 stroke-3" />}
              mainHeading="Add New Product"
              subIcon={<PackageIcon className="size-5 xsm:block hidden text-cyan-100 dark:text-orange-100" />}
              subText="Add a new product to your store, set details like category, pricing, stock, and images, and publish it for customers to view."
            />
            <AdminAddProduct />
          </div>
        </Layout>
      </div>
    </>
  );
};

export default AdminAddProductMain;
