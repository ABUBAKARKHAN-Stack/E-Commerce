import React, { useState } from "react";
import { Layout, SideBar } from "@/components/layout/shared";
import { AdminHeader } from "@/components/layout/admin";
import { AdminDashboard } from "@/components/sections/admin";

const AdminDashboardMain = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AdminHeader setIsOpen={setIsOpen} />
      <div className="my-5 flex">
        <SideBar isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} />
        <Layout>
          <AdminDashboard />
        </Layout>
      </div>
    </>
  );
};

export default AdminDashboardMain;
