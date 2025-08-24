import { useState } from "react";
import { Layout, SideBar } from "@/components/layout/shared";
import { AdminHeader } from "@/components/layout/admin";
import { AdminDashboard } from "@/components/sections/admin";
import { DashboardMainHeader } from "@/components/reusable/shared";
import { Handshake, Sparkles } from "lucide-react";
import { useAuthContext } from "@/context/auth.context";

const AdminDashboardMain = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userLoading } = useAuthContext();

  return (
    <>
      <AdminHeader setIsOpen={setIsOpen} />

      <div className="my-5 flex">
        <SideBar isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} />

        <Layout>
          <div className="space-y-10 px-4">
            <DashboardMainHeader
              mainIcon={<Handshake className="size-8 stroke-3" />}
              mainHeading={
                userLoading
                  ? "Welcome back, ..."
                  : `Welcome back, ${user?.username || "Guest"}!`
              }
              subIcon={
                <Sparkles className="size-5 text-cyan-100 dark:text-orange-100" />
              }
              subText="Oversee your entire store — manage products, orders, customers, and more."
            />

            <AdminDashboard />
          </div>
        </Layout>
      </div>
    </>
  );
};

export default AdminDashboardMain;
