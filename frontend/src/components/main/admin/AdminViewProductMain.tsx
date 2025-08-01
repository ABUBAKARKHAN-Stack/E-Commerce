import { useState } from "react";
import { Layout, SideBar } from "@/components/layout/shared";
import { AdminHeader } from "@/components/layout/admin";
import { AdminViewProduct } from "@/components/sections/admin";

const AdminViewProductMain = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AdminHeader setIsOpen={setIsOpen} />
      <div className="my-5 flex">
        <SideBar isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} />
        <Layout>
          <AdminViewProduct />
        </Layout>
      </div>
    </>
  );
};

export default AdminViewProductMain;
