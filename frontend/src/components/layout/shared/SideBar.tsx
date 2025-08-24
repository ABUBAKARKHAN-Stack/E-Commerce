"use client";
import { Dispatch, forwardRef, SetStateAction } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  ShoppingCart,
  User,
  LogOut,
  Package,
  Home,
  BarChart3,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { useAuthContext } from "@/context/auth.context";
import { useLocation, useNavigate } from "react-router-dom";
import { ToolTip } from "@/components/reusable/shared";
import { ButtonLoader } from "@/components/Skeleton&Loaders/loaders";
import { AuthLoadingStates } from "@/types/main.types";
type Props = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = forwardRef<HTMLElement, Props>(
  ({ isDrawerOpen, setIsDrawerOpen }, ref) => {
    const { user, logout, role, loading } = useAuthContext();
    const logoutLoading = loading === AuthLoadingStates.LOGOUT_LOADING;
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const sideBarItems =
      role === "admin"
        ? [
            {
              icon: <LayoutDashboard strokeWidth={3} className="h-5 w-5" />,
              text: "Dashboard",
              path: "/admin/dashboard",
            },
            {
              icon: <Package strokeWidth={3} className="h-5 w-5" />,
              text: "Products",
              path: "/admin/products",
            },
            {
              icon: <ShoppingBag strokeWidth={3} className="h-5 w-5" />,
              text: "Orders",
              path: "/admin/orders",
            },
            {
              icon: <BarChart3 strokeWidth={3} className="h-5 w-5" />,
              text: "Analytics",
              path: "/admin/analytics",
            },
            {
              icon: <User strokeWidth={3} className="h-5 w-5" />,
              text: "Profile",
              path: "/admin/me",
            },
          ]
        : [
            {
              icon: <Home strokeWidth={3} className="h-5 w-5" />,
              text: "Home",
              path: "/",
            },
            {
              icon: <LayoutDashboard strokeWidth={3} className="h-5 w-5" />,
              text: "Dashboard",
              path: "/dashboard",
            },
            {
              icon: <ShoppingBag strokeWidth={3} className="h-5 w-5" />,
              text: "Orders",
              path: "/orders",
            },
            {
              icon: <Heart strokeWidth={3} className="h-5 w-5" />,
              text: "WishList",
              path: "/wishlist",
            },
            {
              icon: <ShoppingCart strokeWidth={3} className="h-5 w-5" />,
              text: "Cart",
              path: "/cart",
            },
            {
              icon: <User strokeWidth={3} className="h-5 w-5" />,
              text: "Profile",
              path: "/me",
            },
          ];

    const handleNavigation = (path: string) => {
      navigate(path);
    };

    return (
      <>
        {/* Mobile Menu Button */}
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetTrigger asChild></SheetTrigger>
          <SheetContent
            side="left"
            className="border-r border-gray-300 bg-[#FAFAFA]/90 p-4 shadow-xl backdrop-blur-md dark:border-zinc-700 dark:bg-[#1B1B1F]/90"
          >
            {/* User Profile */}
            <div className="flex items-center gap-3 border-b p-4">
              <Button size="icon" className="h-12 w-12">
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
                    className={`flex ${pathname === path || (path !== "/" && pathname.startsWith(path)) ? "bg-gray-200 dark:bg-zinc-700" : ""} cursor-pointer items-center gap-3 rounded-md p-3 transition-colors duration-200 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-zinc-700`}
                    onClick={() => handleNavigation(path)}
                  >
                    {icon}
                    <span>{text}</span>
                  </li>
                ))}
                <li>
                  <button
                    disabled={logoutLoading}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-md p-3 transition-colors duration-200 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-200 dark:hover:bg-zinc-700"
                    onClick={() => logout(navigate)}
                  >
                    {logoutLoading ? (
                      <ButtonLoader loaderText="Signing Out..." />
                    ) : (
                      <>
                        <LogOut strokeWidth={2.5} className="h-5 w-5" />
                        <span>Sign Out</span>
                      </>
                    )}
                  </button>
                </li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>

        <aside
          ref={ref}
          className={`fixed left-6 z-50 hidden h-[calc(93vh-4.5rem)] w-15 transform items-center justify-center rounded-full border-2 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] shadow-xl xl:flex dark:border-zinc-700 dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]`}
        >
          <nav className="flex w-full items-center justify-center">
            <ul className="space-y-1">
              {sideBarItems.map(({ icon, text, path }, i) => (
                <ToolTip
                  key={i}
                  triggerValue={
                    <li
                      className={`p-3 ${
                        pathname === path ||
                        (path !== "/" && pathname.startsWith(path))
                          ? "bg-cyan-500/90 text-white dark:bg-orange-500/90"
                          : ""
                      } cursor-pointer rounded-md text-gray-800 transition-colors duration-300 ease-in-out hover:bg-cyan-500 hover:text-white dark:text-gray-200 dark:hover:bg-orange-500`}
                      onClick={() => handleNavigation(path)}
                    >
                      {icon}
                    </li>
                  }
                  tooltip={text}
                />
              ))}
              <ToolTip
                triggerValue={
                  <li
                    className="cursor-pointer rounded-md p-3 text-gray-800 transition-colors duration-300 ease-in-out hover:bg-cyan-500 hover:text-white dark:text-gray-200 dark:hover:bg-orange-500"
                    onClick={async () => await logout(navigate)}
                  >
                    <LogOut strokeWidth={3} className="h-5 w-5" />
                  </li>
                }
                tooltip="SignOut"
              />
            </ul>
          </nav>
        </aside>
      </>
    );
  },
);

Sidebar.displayName = "SideBar";

export default Sidebar;
