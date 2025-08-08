import { FC } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Logo } from "@/components/reusable/shared";
import { Layout } from "@/components/layout/shared";
import { useAuthContext } from "@/context/authContext";
import { IUser, NavItem } from "@/types/main.types";

//* Header Subcomponents
import {
  DesktopNav,
  MobileMenu,
  UserMenu,
} from "@/components/sections/user/header";
import { useProductContext } from "@/context/productContext";

const Header: FC = () => {
  //* Get user and logout method from auth context
  const { user, logout, userLoading } = useAuthContext();

  const { cartProductsCount } = useProductContext();

  //* Dynamically generate navigation items, conditionally show Wishlist if user is logged in
  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    user && { label: "Wishlist", href: "/wishlist" }, //* Only show if logged in
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ].filter(Boolean) as NavItem[]; //* Remove false values and cast to correct type

  return (
    <header className="h-18 w-full items-center border-b-2 bg-[#FAFAFA] shadow-lg dark:bg-[#1B1B1F]">
      {/* Wrapper Layout for consistent spacing */}
      <Layout className="flex items-center justify-between">
        {/* === Brand Logo === */}
        <Logo />

        {/* === Desktop Navigation Links === */}
        <DesktopNav navItems={navItems} />

        {/* === Right Section: Cart, User Menu, Mobile Menu === */}
        <div className="flex items-center space-x-4">
          {/* === Cart Icon with Badge (hidden on mobile) === */}
          {user && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative hidden md:block ${
                  isActive ? "text-cyan-600 dark:text-orange-500" : ""
                }`
              }
              aria-label="View your cart"
            >
              <div className="relative">
                <ShoppingCart className="h-6 w-6 transition-colors duration-300 hover:text-cyan-600/90 dark:hover:text-orange-600/90" />
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {cartProductsCount}
                </span>
              </div>
            </NavLink>
          )}

          {/* === User Profile Dropdown or Sign In === */}
          <UserMenu logout={logout} user={user as IUser} userLoading={userLoading} />

          {/* === Mobile Navigation Drawer === */}
          <MobileMenu navItems={navItems} user={user as IUser} />
        </div>
      </Layout>
    </header>
  );
};

export default Header;
