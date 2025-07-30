import { ThemeToggler } from '@/components/reusable/shared';
import { useThemeContext } from '@/context/themeContext';
import { Toaster } from 'sonner';
import {UserProfileMain} from '@/components/main/users'

const UserProfilePage = () => {
      const { theme } = useThemeContext()
    return (
        <>
            <UserProfileMain />
            <ThemeToggler />
            <Toaster theme={theme as "light" | 'dark'} />
        </>
    )
}

export default UserProfilePage