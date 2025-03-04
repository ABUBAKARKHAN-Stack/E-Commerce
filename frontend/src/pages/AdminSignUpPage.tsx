import { AdminSignUpMain } from '@/components/main'
import { Layout, ThemeToggler } from '@/components/reusable'
import { Toaster } from 'sonner'
import { useThemeContext } from '@/context/themeContext'


const AdminSignUpPage = () => {

    const { theme } = useThemeContext()


    return (
        <Layout>
            <ThemeToggler />
            <AdminSignUpMain />
            <Toaster position="top-right" theme={theme as "dark" | "light"} />
        </Layout>
    )
}

export default AdminSignUpPage