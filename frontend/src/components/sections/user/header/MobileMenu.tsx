import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from '@/components/ui/sheet'
import { IUser, NavItem } from '@/types/main.types'
import { Menu, ShoppingCart } from 'lucide-react'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'


type Props = {
    user: IUser;
    navItems: NavItem[]
}

const MobileMenu: FC<Props> = ({ user, navItems }) => {
    return (
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
                            `text-lg w-fit flex items-center gap-2 font-semibold text-[#1B1B1F] dark:text-white transition-all hover:scale-105 duration-300 hover:text-cyan-600/90 dark:hover:text-orange-600/90 ${isActive ? "text-cyan-500 dark:text-orange-500" : ""
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
                                `text-lg w-fit flex items-center gap-2 font-semibold text-[#1B1B1F] dark:text-white transition-all hover:scale-105 duration-300 hover:text-cyan-600/90 dark:hover:text-orange-600/90 ${isActive ? "text-cyan-500 dark:text-orange-500" : ""
                                }`
                            }
                        >
                            Sign In
                        </NavLink>)
                    }
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu