import { SignInMain } from "@/components/main"
import { Layout, ThemeToggler } from "@/components/reusable"
import { useThemeContext } from "@/context/themeContext"
import { Toaster } from "sonner"


const SignInPage = () => {

  const { theme } = useThemeContext()
  return (
    <Layout>
      <ThemeToggler />
      <SignInMain />
      <Toaster theme={theme as "dark" | "light"} />
    </Layout>
  )
}

export default SignInPage