import { Button } from '@/components/ui/button'
import { DropdownItem, DropdownItems, DropdownMain } from '@/components/ui/dropdown-menu'
import { useAuthContext } from '@/context/authContext'
import { IUser } from '@/types/main.types'
import { LayoutDashboardIcon, LocateFixed, LogOutIcon } from 'lucide-react'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

type Props = {
    user: IUser;
    logout: (navigate: (path: string) => void) => void
}

const UserMenu: FC<Props> = ({ user, logout }) => {

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
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

    if (!user) {
        return (
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
    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <Button
                onClick={openDropDown}
                className="rounded-full p-4"
                variant="default"
                size={"icon"}
            >
                <span className="font-bold text-base">{user.username.charAt(0)}</span>
            </Button>

            {/* Dropdown Content */}
            {isDropDownOpen && (
                <DropdownMain isOpen={isDropDownOpen}>
                    <DropdownItems>
                        <span className="px-4 py-2 text-left font-medium">Abubakar</span>
                        <div className="border-t mb-1"></div>
                        <DropdownItem>
                            <Link to='/dashboard'>
                                Dashboard <LayoutDashboardIcon className="inline-block w-5 h-5 ml-2" />
                            </Link>
                        </DropdownItem>
                         <DropdownItem>
                            <Link to={`/track-order`}>
                                Track Order <LocateFixed className="inline-block w-5 h-5 ml-2" />
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
}

export default UserMenu