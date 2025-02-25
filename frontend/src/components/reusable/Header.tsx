import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, LogOut } from "lucide-react";
import { Layout, Logo } from "@/components/reusable";
import { useUserContext } from "@/context/userContext";
import { logoutUser } from "@/API/userApi";

const Header: FC = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Orders", href: "/orders" },
    { label: "Contact", href: "/contact" },
  ];

  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      console.log(res);
      if (res.data.success) {
        navigate("/sign-in");
      }

    } catch (error) {
      console.log(error);

    }
  };

  return (
    <header className=" h-20 w-full border-b-2 items-center dark:bg-[#1B1B1F] shadow-lg">
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
          <NavLink to="/cart" className="relative">
            {({ isActive }) => (
              <>
                <ShoppingCart
                  className="h-6 w-6 transition-colors duration-300 hover:text-cyan-600  dark:hover:text-[#F76D3A]
                    "
                />
                <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white font-bold w-5 h-5 flex justify-center items-center rounded-full">
                  3 {/* Example cart count */}
                </span>
              </>
            )}
          </NavLink>

          {/* Sign In Button */}
          {user !== null ? (

            <div className="flex items-center space-x-2">
              <NavLink to="/profile" className="hidden md:block">
                <Button
                  className="rounded-full"
                  variant="default"
                  size={"lg"}
                >
                  {/*  {user?.name} */} Abubakar
                </Button>
              </NavLink>
              <Button
                variant="default"
                size={"lg"}
                className="rounded-full"
                onClick={handleLogout}
              >
                <LogOut className="h-6 w-6" />
              </Button>
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
                className="md:hidden text-white border-gray-400 transition-colors duration-300 hover:border-[#F76D3A]"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4 bg-[#1B1B1F]/40 backdrop-blur-2xl text-white">
              <div className="flex flex-col mt-24 gap-4">
                {navItems.map(({ label, href }) => (
                  <NavLink
                    key={href}
                    to={href}
                    className={({ isActive }) =>
                      `text-lg w-fit font-semibold transition-all hover:scale-[1.05] duration-300 hover:text-[#F76D3A] ${isActive ? "text-[#F76D3A]" : ""
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `text-lg font-semibold flex items-center gap-2 transition-colors duration-300 ${isActive ? "text-[#F76D3A]" : "hover:text-[#F76D3A]"
                    }`
                  }
                >
                  <ShoppingCart className="h-6 w-6" /> Cart (3)
                </NavLink>
                <NavLink
                  to="/sign-in"
                  className={({ isActive }) =>
                    `text-lg font-semibold transition-colors duration-300 ${isActive ? "text-[#F76D3A]" : "hover:text-[#F76D3A]"
                    }`
                  }
                >
                  Sign In
                </NavLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Layout>
    </header>
  );
};

export default Header;
