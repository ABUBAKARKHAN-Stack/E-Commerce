import { ButtonLoader } from "@/components/reusable/shared";
import { ProfileIconSkeleton } from "@/components/reusable/shared/skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownItem,
  DropdownItems,
  DropdownMain,
} from "@/components/ui/dropdown-menu2";
import { useAuthContext } from "@/context/authContext";
import { AuthLoadingStates } from "@/types/main.types";
import { LayoutDashboardIcon, LocateFixed, LogOutIcon } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";



const UserMenu: FC = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {
    user,
    userLoading,
    loading,
    logout
  } = useAuthContext();
  const logoutLoading = loading === AuthLoadingStates.LOGOUT_LOADING;

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
    <div className="relative inline-block" ref={dropdownRef}>
      {
        userLoading ? (<ProfileIconSkeleton />) : user ?
          (<Button
            onClick={openDropDown}
            className="rounded-full p-4"
            variant="default"
            size={"icon"}
          >
            <span className="text-base font-bold">{user.username.charAt(0)}</span>
          </Button>)
          : <NavLink to="/sign-in" className="hidden md:block">
            <Button variant="default" size={"lg"}>
              Sign In
            </Button>
          </NavLink>
      }

      {/* Dropdown Content */}
      {isDropDownOpen && (
        <DropdownMain isOpen={isDropDownOpen}>
          <DropdownItems>
            <span className="px-4 py-2 text-left font-medium">{user?.username ?? "Guest"}</span>
            <div className="mb-1 border-t"></div>
            <DropdownItem>
              <Link to="/dashboard">
                Dashboard{" "}
                <LayoutDashboardIcon className="ml-2 inline-block h-5 w-5" />
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link to={`/track-order`}>
                Track Order{" "}
                <LocateFixed className="ml-2 inline-block h-5 w-5" />
              </Link>
            </DropdownItem>
            <DropdownItem>
              <button
                disabled={logoutLoading}
                className="disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                onClick={() => logout(navigate)}>
                {
                  logoutLoading ? <ButtonLoader
                    row_reverse
                    loaderText="Signing Out..."
                  /> : <>
                    Sign Out{" "}
                    <LogOutIcon className="ml-2 inline-block h-5 w-5" />
                  </>
                }
              </button>
            </DropdownItem>
          </DropdownItems>
        </DropdownMain>
      )}
    </div>
  );
};

export default UserMenu;
