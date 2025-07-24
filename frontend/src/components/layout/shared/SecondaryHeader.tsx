import { Dispatch,  forwardRef, SetStateAction } from 'react'
import Layout from './Layout'
import { Logo } from '@/components/reusable/shared'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useAuthContext } from '@/context/authContext'

type Props = {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SecondaryHeader = forwardRef<HTMLElement, Props>(({ setIsOpen }, ref) => {
    const { user } = useAuthContext();

    return (
        <header
            ref={ref}
            className="h-20 w-full border-b-2 dark:bg-[#1B1B1F] shadow-lg"
        >
            <Layout className="flex justify-between items-center">
                <Logo />
                <div className="flex items-center gap-x-2.5">
                    <Button
                        className="rounded-full p-4"
                        variant="default"
                        size="icon"
                    >
                        <span className="font-bold text-base">
                            {user?.username.charAt(0)}
                        </span>
                    </Button>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-1.5 cursor-pointer xl:hidden flex rounded-md justify-center items-center w-10 h-10 border"
                    >
                        <Menu className="w-9 h-9 text-gray-900 dark:text-gray-200" />
                    </button>
                </div>
            </Layout>
        </header>
    );
});

SecondaryHeader.displayName = "SecondaryHeader";



export default SecondaryHeader