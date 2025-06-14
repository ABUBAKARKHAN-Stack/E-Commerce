import { LayoutDashboardIcon, LogOutIcon, Menu } from 'lucide-react'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/reusable/Logo'
import Layout from '@/components/layout/shared/Layout'
import { useAuthContext } from '@/context/authContext'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { DropdownItem, DropdownItems, DropdownMain } from '@/components/ui/dropdown-menu'

type Props = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminHeader: FC<Props> = ({ setIsOpen }) => {
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false)
    const { user, logout } = useAuthContext()
    const navigate = useNavigate()

    const openDropDown = () => {
        setIsDropDownOpen((prev) => !prev)
    }


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
        <header className=" h-20 w-full border-b-2 dark:bg-[#1B1B1F] shadow-lg">
            <Layout className="flex justify-between items-center">
                <Logo />
                <div className="flex items-center gap-x-2.5">
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
                                                onClick={() => logout(navigate)}

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
                            <NavLink to="/admin/sign-in" className="hidden md:block">
                                <Button
                                    variant="default"
                                    size={"lg"}
                                >
                                    Sign In
                                </Button>
                            </NavLink>
                        )
                    }

                    <button onClick={() => setIsOpen(true)} className="p-1.5 xl:hidden flex rounded-md  justify-center items-center w-10 h-10 border">
                        <Menu className=" w-9 h-9 text-gray-900 dark:text-gray-200" />
                    </button>
                </div>
            </Layout>
        </header>
    )
}

export default AdminHeader