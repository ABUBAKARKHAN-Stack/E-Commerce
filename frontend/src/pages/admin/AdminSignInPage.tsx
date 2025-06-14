import { AdminSignInMain } from "@/components/main/admin"
import { ThemeToggler } from "@/components/reusable"
import { Layout } from "@/components/layout/shared"
import { useThemeContext } from "@/context/themeContext"
import { Toaster } from "sonner"


const AdminSignInPage = () => {

  const { theme } = useThemeContext()
  return (
    <Layout>
      <ThemeToggler />
      <AdminSignInMain />
      <Toaster theme={theme as "dark" | "light"} />
    </Layout>
  )
}

export default AdminSignInPage