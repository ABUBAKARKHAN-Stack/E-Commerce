import { useState } from "react";
import { Layout, SideBar } from "@/components/layout/shared";
import { AdminHeader } from "@/components/layout/admin";
import { AdminViewProduct } from "@/components/sections/admin";
import { DashboardMainHeader } from "@/components/reusable/shared";
import { PackageCheck, PackageSearch } from "lucide-react";

const AdminViewProductMain = () => {
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
              mainHeading="Product Details"
              subIcon={
                <PackageSearch className="size-5 text-cyan-100 dark:text-orange-100" />
              }
              subText="View complete details, images, and status of the selected product."
            />
            <AdminViewProduct />
          </div>
        </Layout>
      </div>
    </>
  );
};

export default AdminViewProductMain;
