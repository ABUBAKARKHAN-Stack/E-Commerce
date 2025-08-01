import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavItem } from "@/types/main.types";
import { FC } from "react";

type Props = {
  navItems: NavItem[];
};

const DesktopNav: FC<Props> = ({ navItems }) => {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="flex space-x-3">
        {navItems.map(({ label, href }) => (
          <NavigationMenuLink
            className={"text-[#1B1B1F] dark:text-white"}
            to={href}
            key={href}
          >
            {label}
          </NavigationMenuLink>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNav;
