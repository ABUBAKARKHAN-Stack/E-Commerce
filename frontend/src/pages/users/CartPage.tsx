import { Footer, Header } from '@/components/layout/user';
import { CartMain } from '@/components/main/users';
import { ThemeToggler } from '@/components/reusable/shared';
import { useThemeContext } from '@/context/themeContext';
import { Toaster } from 'sonner';

const CartPage = () => {
    const { theme } = useThemeContext();


    return (
        <>
            <Header />
            <CartMain />
            <Footer />
            <Toaster theme={theme as "light" | 'dark'} />
            <ThemeToggler />
        </>
    )
}

export default CartPage