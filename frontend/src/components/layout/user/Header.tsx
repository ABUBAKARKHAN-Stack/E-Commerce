import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { FC, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, LogOutIcon, LayoutDashboardIcon } from "lucide-react";
import { Logo } from "@/components/reusable/shared";
import { Layout } from '@/components/layout/shared'
import { DropdownItem, DropdownItems, DropdownMain } from '@/components/ui/dropdown-menu'
import { useAuthContext } from "@/context/authContext";


const Header: FC = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openDropDown = () => {
    setIsDropDownOpen((prev) => !prev)
  }

  const handleLogout = () => {
    logout(navigate);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-18 w-full border-b-2 items-center dark:bg-[#1B1B1F] bg-[#FAFAFA] shadow-lg">
      <Layout className="flex items-center justify-between">
        {/* Logo */}
        <Logo />
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex space-x-3">
            {navItems.map(({ label, href }) => (
              <NavigationMenuLink className={'text-[#1B1B1F] dark:text-white'} to={href} key={href}>
                {label}
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section: Cart, Sign In, Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon with Badge */}
          <NavLink to="/cart" className="relative hidden md:block">
            <>
              <ShoppingCart
                className="h-6 w-6 transition-colors duration-300 hover:text-cyan-600/90/90  dark:hover:text-orange-600/90
                "
              />
              <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white font-bold w-5 h-5 flex justify-center items-center rounded-full">
                3 {/* Example cart count */}
              </span>
            </>

          </NavLink>

          {user !== null ? (
            <div className="relative inline-block" ref={dropdownRef}>
              <Button
                onClick={openDropDown}
                className="rounded-full p-4"
                variant="default"
                size={"icon"}
              >
                <span className="font-bold text-base">{user?.username.charAt(0)}</span>
              </Button>

              {/* Dropdown Content */}
              {isDropDownOpen && (
                <DropdownMain isOpen={isDropDownOpen}>
                  <DropdownItems>

                    <span className="px-4 py-2 text-left font-medium">Abubakar</span>

                    <div className="border-t mb-1"></div>
                    <DropdownItem>
                      <Link to={`/user/dashboard`}>
                        Dashboard <LayoutDashboardIcon className="inline-block w-5 h-5 ml-2" />
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <button
                        onClick={handleLogout}

                      >
                        Sign Out <LogOutIcon className="inline-block w-5 h-5 ml-2" />
                      </button>
                    </DropdownItem>
                  </DropdownItems>
                </DropdownMain>
              )}
            </div>
          )
            : (
              <NavLink to="/sign-in" className="hidden md:block">
                <Button
                  variant="default"
                  size={"lg"}
                >
                  Sign In
                </Button>
              </NavLink>
            )
          }


          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden dark:text-white dark:border-gray-400 transition-colors duration-300 hover:border-orange-500"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent isForNav={true} side="left" className="p-4 bg-[#FAFAFA]/40  dark:bg-[#1B1B1F]/40 backdrop-blur-2xl border-b-2 text-white">
              <div className="flex flex-col mt-24 gap-4">
                {navItems.map(({ label, href }) => (
                  <NavLink
                    key={href}
                    to={href}
                    className={({ isActive }) =>
                      `text-lg w-fit font-semibold text-[#1B1B1F] dark:text-white transition-all hover:scale-105 duration-300 hover:text-cyan-600/90 dark:hover:text-orange-600/90 ${isActive ? "text-cyan-500 dark:text-orange-500" : ""
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `text-lg w-fit flex items-center gap-2 font-semibold text-[#1B1B1F] dark:text-white transition-all hover:scale-105 duration-300 hover:text-cyan-600/90 dark:hover:text-orange-600/90 ${isActive ? "text-cyan-500 dark:text-orange-500" : ""
                    }`
                  }
                >
                  <ShoppingCart className="h-6 w-6" /> Cart (3)
                </NavLink>
                {
                  !user && (<NavLink
                    to="/sign-in"
                    className={({ isActive }) =>
                      `text-lg font-semibold transition-colors duration-300 ${isActive ? "text-orange-500" : "hover:text-orange-600/90"
                      }`
                    }
                  >
                    Sign In
                  </NavLink>)
                }
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Layout>
    </header>
  );
};

export default Header;
