import { ThemeToggler } from "@/components/reusable/shared"
import { Layout } from '@/components/layout/shared'
import { Header } from '@/components/layout/user'
import { HeroMain, FeaturedCategoriesMain } from '@/components/main/users'
import { useAuthContext } from "@/context/authContext"
const HomePage = () => {

  const { user } = useAuthContext()
  console.log(user);

  return (
    <>
      <Header />
      <HeroMain />
      <FeaturedCategoriesMain />
      <ThemeToggler />
    </>
  )
}

export default HomePage