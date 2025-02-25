import { SignUpMain } from '@/components/main'
import {Layout , ThemeToggler} from '@/components/reusable'
import { Toaster } from 'sonner'
import { useThemeContext } from '@/context/themeContext'


const SignUpPage = () => {

  const { theme } = useThemeContext()
 

  return (
    <Layout>
      <ThemeToggler  />
      <SignUpMain />
      <Toaster position="top-right" theme={theme as "dark" | "light"} />
    </Layout>
  )
}

export default SignUpPage