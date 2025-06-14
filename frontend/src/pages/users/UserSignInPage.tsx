import { UserSignInMain } from "@/components/main/users"
import { ThemeToggler } from "@/components/reusable"
import { Layout } from "@/components/layout/shared"
import { useThemeContext } from "@/context/themeContext"
import { Toaster } from "sonner"


const UserSignInPage = () => {

  const { theme } = useThemeContext()
  return (
    <Layout>
      <ThemeToggler />
      <UserSignInMain />
      <Toaster theme={theme as "dark" | "light"} />
    </Layout>
  )
}

export default UserSignInPage