"use client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import {
    LayoutDashboard,
    ShoppingBag,
    Heart,
    ShoppingCart,
    User,
    Settings,
    LogOut,
    LifeBuoy,
    Package,
} from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useAuthContext } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";

type Props = {
    setActiveTab?: (tab: string) => void;
    isDrawerOpen: boolean;
    setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar: FC<Props> = ({ setActiveTab, isDrawerOpen, setIsDrawerOpen }) => {
    const { user, logout, role } = useAuthContext();
    const navigate = useNavigate()

    const sideBarItems = role === "admin" ? [
        { icon: <LayoutDashboard strokeWidth={3} className="w-5 h-5 " />, text: "Dashboard", path: "/admin/dashboard" },
        { icon: <Package strokeWidth={3} className="w-5 h-5" />, text: "Products", path: "/admin/products" },
        { icon: <ShoppingBag strokeWidth={3} className="w-5 h-5 " />, text: "Orders", path: "/admin/orders" },
        { icon: <User strokeWidth={3} className="w-5 h-5 " />, text: "Profile", path: "/admin/profile" }
    ] : [
        { icon: <LayoutDashboard strokeWidth={3} className="w-5 h-5 " />, text: "Dashboard", path: "dashboard" },
        { icon: <ShoppingBag strokeWidth={3} className="w-5 h-5 " />, text: "Orders", path: "orders" },
        { icon: <Heart strokeWidth={3} className="w-5 h-5 " />, text: "WishList", path: "wishlist" },
        { icon: <ShoppingCart strokeWidth={3} className="w-5 h-5 " />, text: "Cart", path: "cart" },
        { icon: <User strokeWidth={3} className="w-5 h-5 " />, text: "Profile", path: "profile" },
        { icon: <LifeBuoy strokeWidth={3} className="w-5 h-5" />, text: "Help & Support", path: "help" }
    ]

    const handleNavigation = (path: string) => {
        if (role === "admin" && path.startsWith("/admin")) {
            navigate(path);
        } else {
            setActiveTab!(path);
        }
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <SheetTrigger asChild>

                </SheetTrigger>
                <SheetContent side="left" className="p-4 bg-[#FAFAFA]/90 dark:bg-[#1B1B1F]/90 backdrop-blur-md border-r border-gray-300 dark:border-zinc-700 shadow-xl">

                    {/* User Profile */}
                    <div className="flex items-center gap-3 p-4 border-b">
                        <Button size="icon" className="w-12 h-12">
                            <span className="text-2xl">{user?.username?.charAt(0)}</span>
                        </Button>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-950 dark:text-white">
                                {user?.username}
                            </h2>
                            <p className="text-[9px] font-medium text-gray-900 dark:text-gray-300">
                                {user?.email}
                            </p>
                        </div>
                    </div>


                    {/* Sidebar Navigation */}

                    <nav>
                        <ul className="space-y-2">
                            {sideBarItems.map(({ icon, text, path }, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-200 dark:text-gray-200"
                                    onClick={() => handleNavigation(path)}
                                >
                                    {icon}
                                    <span>{text}</span>
                                </li>
                            ))}
                            <li
                                className="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-200  dark:text-gray-200"
                                onClick={async () => await logout(navigate)}
                            >
                                <LogOut strokeWidth={2.5} className="w-5 h-5" />
                                <span>Sign Out</span>
                            </li>
                        </ul>
                    </nav>
                </SheetContent>
            </Sheet>

            <aside className="w-15 h-[calc(93vh-5rem)] hidden  xl:flex justify-center items-center fixed left-6 z-50 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F] shadow-xl border-2 dark:border-zinc-700 rounded-full">
                <nav className="w-full flex items-center justify-center">
                    <ul className="space-y-2">
                        {sideBarItems.map(({ icon, text, path }, i) => (
                            <TooltipProvider key={i}>
                                <Tooltip>
                                    <TooltipTrigger className="flex items-center justify-center">
                                        <li
                                            className="p-3 rounded-md cursor-pointer hover:bg-cyan-500 dark:hover:bg-orange-500 transition-colors ease-in-out duration-300 hover:text-white text-gray-800 dark:text-gray-200"
                                            onClick={() => handleNavigation(path)}
                                        >
                                            {icon}
                                            <TooltipContent>
                                                <p>{text}</p>
                                            </TooltipContent>
                                        </li>
                                    </TooltipTrigger>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="flex items-center justify-center">
                                    <li
                                        className="p-3 rounded-md cursor-pointer hover:bg-cyan-500 dark:hover:bg-orange-500 transition-colors ease-in-out duration-300 hover:text-white text-gray-800 dark:text-gray-200"
                                        onClick={async () => await logout(navigate)}
                                    >
                                        <LogOut strokeWidth={3} className="w-5 h-5" />
                                        <TooltipContent>
                                            <p>SignOut</p>
                                        </TooltipContent>
                                    </li>
                                </TooltipTrigger>
                            </Tooltip>
                        </TooltipProvider>
                    </ul>
                </nav>
            </aside>
        </>
    );
};


export default Sidebar;

