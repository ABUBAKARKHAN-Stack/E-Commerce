import { ThemeToggler } from "@/components/reusable"
import { Layout } from '@/components/layout/shared'
import { Header } from '@/components/layout/user'
import { HeroMain } from '@/components/main/users'
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