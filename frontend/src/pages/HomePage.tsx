import { Header, Layout, ThemeToggler } from "@/components/reusable"
import { HeroMain } from '@/components/main'
import { useThemeContext } from "@/context/themeContext"
import { useAuthContext } from "@/context/authContext"
const HomePage = () => {

  const { user } = useAuthContext()
  console.log(user);

  return (
    <>
      <Header />
      <HeroMain />
      <ThemeToggler />
      <Layout>
        hi
      </Layout>

    </>
  )
}

export default HomePage