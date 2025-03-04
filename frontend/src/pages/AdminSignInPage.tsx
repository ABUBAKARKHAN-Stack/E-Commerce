import { AdminSignInMain } from "@/components/main"
import { Layout, ThemeToggler } from "@/components/reusable"
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