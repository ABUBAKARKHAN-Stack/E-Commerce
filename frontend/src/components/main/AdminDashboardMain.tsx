import React, { useState } from "react";
import { Layout, Logo, SideBar, AdminDashboard, AdminHeader } from "../reusable"; // Adjust import path
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useAuthContext } from "@/context/authContext";

const AdminDashboardMain = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <AdminDashboard />;
      case "orders":
      // return <Products />;
      default:
        return <AdminDashboard />;
    }
  };



  return (
    <>
      <AdminHeader setIsOpen={setIsOpen} />
      <div className="flex my-5">
        <SideBar isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} setActiveTab={setActiveTab} />
        <Layout>
          {renderContent()}
        </Layout>
      </div>
    </>
  );
};

export default AdminDashboardMain;