import { useThemeContext } from '@/context/themeContext';
import { Toaster } from 'sonner';
import { ThemeToggler } from '@/components/reusable/shared';
import { CheckoutSuccessMain } from '@/components/main/users';

const CheckoutSuccessPage = () => {
    const { theme } = useThemeContext();
  
    return (
        <>
            <CheckoutSuccessMain />
            <Toaster theme={theme as 'dark' | 'light'} />
            <ThemeToggler />
        </>
    );
};

export default CheckoutSuccessPage;
