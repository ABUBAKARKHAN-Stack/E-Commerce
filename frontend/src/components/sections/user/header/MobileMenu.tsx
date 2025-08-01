import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IUser, NavItem } from "@/types/main.types";
import { Menu, ShoppingCart } from "lucide-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  user: IUser;
  navItems: NavItem[];
};

const MobileMenu: FC<Props> = ({ user, navItems }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="transition-colors duration-300 hover:border-orange-500 md:hidden dark:border-gray-400 dark:text-white"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        isForNav={true}
        side="left"
        className="border-b-2 bg-[#FAFAFA]/40 p-4 text-white backdrop-blur-2xl dark:bg-[#1B1B1F]/40"
      >
        <div className="mt-24 flex flex-col gap-4">
          {navItems.map(({ label, href }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `flex w-fit items-center gap-2 text-lg font-semibold text-[#1B1B1F] transition-all duration-300 hover:scale-105 hover:text-cyan-600/90 dark:text-white dark:hover:text-orange-600/90 ${
                  isActive ? "text-cyan-500 dark:text-orange-500" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex w-fit items-center gap-2 text-lg font-semibold text-[#1B1B1F] transition-all duration-300 hover:scale-105 hover:text-cyan-600/90 dark:text-white dark:hover:text-orange-600/90 ${
                isActive ? "text-cyan-500 dark:text-orange-500" : ""
              }`
            }
          >
            <ShoppingCart className="h-6 w-6" /> Cart (3)
          </NavLink>
          {!user && (
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                `flex w-fit items-center gap-2 text-lg font-semibold text-[#1B1B1F] transition-all duration-300 hover:scale-105 hover:text-cyan-600/90 dark:text-white dark:hover:text-orange-600/90 ${
                  isActive ? "text-cyan-500 dark:text-orange-500" : ""
                }`
              }
            >
              Sign In
            </NavLink>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
