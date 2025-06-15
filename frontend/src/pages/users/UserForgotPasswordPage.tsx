import { UserForgotPasswordMain } from '@/components/main/users'
import { ThemeToggler } from '@/components/reusable/shared';
import { Layout } from '@/components/layout/shared';
import { useThemeContext } from '@/context/themeContext';
import { Toaster } from '@/components/ui/sonner';

const UserForgotPasswordPage = () => {
  const { theme } = useThemeContext()
  return (
    <Layout>
      <ThemeToggler />
      <UserForgotPasswordMain />
      <Toaster theme={theme as "dark" | "light"} />
    </Layout>
  )
}

export default UserForgotPasswordPage