import { useState } from "react";
import { Layout, SideBar } from "@/components/layout/shared";
import { AdminHeader } from "@/components/layout/admin";
import { AdminUpdateProduct } from "@/components/sections/admin";
import { DashboardMainHeader } from "@/components/reusable/shared";
import { PackageCheck, PackageSearch } from "lucide-react";

const AdminUpdateProductMain = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AdminHeader setIsOpen={setIsOpen} />
      <div className="my-5 flex">
        <SideBar isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} />
        <Layout>
          <div className="space-y-10 px-4">
            <DashboardMainHeader
              mainIcon={<PackageCheck className="size-8 stroke-3" />}
              mainHeading="Update Product"
              subIcon={
                <PackageSearch className="size-5 text-cyan-100 dark:text-orange-100" />
              }
              subText="Edit product details, pricing, images, and availability as needed."
            />

            <AdminUpdateProduct />
          </div>
        </Layout>
      </div>
    </>
  );
};

export default AdminUpdateProductMain;
