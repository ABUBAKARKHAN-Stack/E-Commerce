import React, { useState } from "react";
import { Layout, Logo, SideBar, UserDashboard } from "../reusable"; // Adjust import path
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useAuthContext } from "@/context/authContext";

const UserDashboardMain = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const { user } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);

    console.log(activeTab);
    

    const renderContent = () => {
        switch (activeTab) {
            case "home":
                return <UserDashboard />;
            case "orders":
            // return <Products />;
            default:
                return <UserDashboard />;
        }
    };

    return (
        <>
            <header className=" h-20 w-full border-b-2 dark:bg-[#1B1B1F] shadow-lg">
                <Layout className="flex justify-between items-center">
                    <Logo />
                    <div className="flex items-center gap-x-2.5">
                        <Button
                            className="rounded-full p-4"
                            variant="default"
                            size={"icon"}
                        >
                            <span className="font-bold text-base">{user?.username.charAt(0)}</span>
                        </Button>

                        <button onClick={() => setIsOpen(true)} className="p-1.5 xl:hidden flex rounded-md  justify-center items-center w-10 h-10 border">
                            <Menu className=" w-9 h-9 text-gray-900 dark:text-gray-200" />
                        </button>
                    </div>
                </Layout>
            </header>
            <div className="flex my-5">
                <SideBar isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} setActiveTab={setActiveTab} />
                <Layout>
                        {renderContent()}
                </Layout>
            </div>
        </>
    );
};

export default UserDashboardMain;