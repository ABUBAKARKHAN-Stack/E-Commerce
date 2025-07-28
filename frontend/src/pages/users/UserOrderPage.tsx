import { UserOrderMain } from '@/components/main/users'
import { ThemeToggler } from '@/components/reusable/shared'
import { useThemeContext } from '@/context/themeContext'
import { Toaster } from 'sonner'

const UserOrderPage = () => {
    const { theme } = useThemeContext()
    return (
        <>
            <UserOrderMain />
            <ThemeToggler />
            <Toaster theme={theme as "light" | 'dark'} />
        </>
    )
}

export default UserOrderPage