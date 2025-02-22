import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { FC } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";

const Header: FC = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Orders", href: "/orders" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="flex h-20 w-full border-b-2 items-center dark:bg-[#1B1B1F] justify-between px-4 md:px-8 shadow-lg">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-white">
        <img
          src="./shopnex.webp"
          alt="ShopNex Logo"
          className="w-44 dark:invert-0 invert shadow-logo"
        />
      </Link>

      {/* Desktop Navigation */}
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="flex space-x-3">
          {navItems.map(({ label, href }) => (
            <NavigationMenuLink asChild key={href}>
              <Link
                to={href.toLowerCase()}
                className="relative ease-linear font-medium dark:text-white text-[#0056BF] transition-all duration-300
                after:content-[''] after:absolute after:left-1/2 after:bottom-[5px] after:w-0 after:h-[2px]
                after:bg-gradient-to-r after:from-[#F15136] after:via-[#FBA740] after:to-[#A3302A]
                after:transition-all after:duration-300 after:ease-in-out after:-translate-x-1/2
                hover:after:w-4/7 hover:text-[#F15136]"
              >
                {label}
              </Link>
            </NavigationMenuLink>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right Section: Cart, Sign In, Mobile Menu */}
      <div className="flex items-center space-x-4">
        {/* Cart Icon with Badge */}
        <Link to="/cart" className="relative">
          <ShoppingCart className="h-6 w-6 transition-colors duration-300 text-white hover:text-[#F76D3A] " />
          <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white font-bold w-5 h-5 flex justify-center items-center rounded-full">
            3 {/* Example cart count */}
          </span>
        </Link>

        {/* Sign In Button */}
        <Link to="/sign-in">
          <Button variant="default" className="hidden md:block text-black transition-colors duration-300 hover:bg-[#F15136] hover:text-white">
            Sign In
          </Button>
        </Link>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden text-white border-gray-400 transition-colors duration-300 hover:border-[#FBA740]">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-4 bg-[#1B1B1F]/40 backdrop-blur-2xl text-white">
           
            <div className="flex flex-col mt-20 gap-4">
              {navItems.map(({ label, href }) => (
                <Link
                  key={href}
                  to={href}
                  className="text-lg w-fit font-semibold transition-colors duration-300 hover:text-[#F76D3A]"
                >
                  {label}
                </Link>
              ))}
              <Link to="/cart" className="text-lg font-semibold flex items-center gap-2 transition-colors duration-300 hover:text-[#FBA740]">
                <ShoppingCart className="h-6 w-6" /> Cart (3)
              </Link>
              <Link to="/sign-in" className="text-lg font-semibold transition-colors duration-300 hover:text-[#F76D3A]">
                Sign In
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
