import { useState } from "react";
import { SideBar, Layout } from "@/components/layout/shared";
import { AdminHeader } from "@/components/layout/admin";
import { AdminProducts } from "@/components/sections/admin";
import { DashboardMainHeader } from "@/components/reusable/shared";
import { PackageCheck, PackageSearch, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminProductsMian = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      <AdminHeader setIsOpen={setIsOpen} />
      <div className="my-5 flex">
        <SideBar isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} />
        <Layout>
          <div className="space-y-10 px-4">
            <div className="flex flex-col gap-y-6">
              <DashboardMainHeader
                mainIcon={<PackageSearch className="size-8 stroke-3" />}
                mainHeading="Manage Products"
                subIcon={
                  <PackageCheck className="size-5 text-cyan-100 dark:text-orange-100" />
                }
                subText="Efficiently manage, update, and organize all products in your store."
              />
              <div className="max-w-lg">
                <Label
                  htmlFor="search-products"
                  className="mb-1 flex items-center justify-start gap-x-1.5"
                >
                  <Search className="size-4.5" />
                  Search Products
                </Label>
                <Input
                  name="search-products"
                  id="search-products"
                  placeholder="Search Products Here...."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <AdminProducts search={search} />
          </div>
        </Layout>
      </div>
    </>
  );
};

export default AdminProductsMian;
