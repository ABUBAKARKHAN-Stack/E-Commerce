import { Header, Layout, ThemeToggler } from "@/components/reusable"
import { HeroMain } from '@/components/main'
import { useThemeContext } from "@/context/themeContext"
import { useUserContext } from "@/context/userContext"
const HomePage = () => {

   const { theme } = useThemeContext()
   const {user} = useUserContext()
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