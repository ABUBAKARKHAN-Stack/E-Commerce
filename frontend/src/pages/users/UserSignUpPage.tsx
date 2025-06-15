import { UserSignUpMain } from '@/components/main/users'
import { ThemeToggler } from '@/components/reusable/shared'
import { Layout } from '@/components/layout/shared'
import { Toaster } from 'sonner'
import { useThemeContext } from '@/context/themeContext'


const UserSignUpPage = () => {

  const { theme } = useThemeContext()


  return (
    <Layout>
      <ThemeToggler />
      <UserSignUpMain />
      <Toaster position="top-right" theme={theme as "dark" | "light"} />
    </Layout>
  )
}

export default UserSignUpPage