import { LayoutDashboardIcon, LogOutIcon, Menu } from "lucide-react";
import React, { FC, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/reusable/shared/Logo";
import Layout from "@/components/layout/shared/Layout";
import { useAuthContext } from "@/context/authContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  DropdownItem,
  DropdownItems,
  DropdownMain,
} from "@/components/ui/dropdown-menu2";
import { ProfileIconSkeleton } from "@/components/reusable/shared/skeleton";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminHeader: FC<Props> = ({ setIsOpen }) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const { logout, user, userLoading } = useAuthContext();

  const navigate = useNavigate();

  const openDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 w-full border-b-2 shadow-lg dark:bg-[#1B1B1F]">
      <Layout className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-x-2.5">
          {
            userLoading ? (
              <ProfileIconSkeleton />
            ) : user ? (
              <div className="relative inline-block" ref={dropdownRef}>
                <Button
                  onClick={openDropDown}
                  className="rounded-full p-4"
                  variant="default"
                  size={"icon"}
                >
                  <span className="text-base font-bold">
                    {user?.username.charAt(0)}
                  </span>
                </Button>

                {/* Dropdown Content */}
                {isDropDownOpen && (
                  <DropdownMain isOpen={isDropDownOpen}>
                    <DropdownItems>
                      <span className="px-4 py-2 text-left font-medium">
                        {user.username}
                      </span>

                      <div className="mb-1 border-t"></div>
                      <DropdownItem>
                        <Link to={`/admin/dashboard`}>
                          Dashboard{" "}
                          <LayoutDashboardIcon className="ml-2 inline-block h-5 w-5" />
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <button onClick={() => logout(navigate)}>
                          Sign Out{" "}
                          <LogOutIcon className="ml-2 inline-block h-5 w-5" />
                        </button>
                      </DropdownItem>
                    </DropdownItems>
                  </DropdownMain>
                )}
              </div>
            )
              : (
                <NavLink to="/admin/sign-in" className="hidden md:block">
                  <Button variant="default" size={"lg"}>
                    Sign In
                  </Button>
                </NavLink>
              )
          }

          <button
            onClick={() => setIsOpen(true)}
            className="flex h-10 w-10 items-center cursor-pointer justify-center rounded-md border p-1.5 xl:hidden"
          >
            <Menu className="h-9 w-9 text-gray-900 dark:text-gray-200" />
          </button>
        </div>
      </Layout>
    </header>
  );
};

export default AdminHeader;
