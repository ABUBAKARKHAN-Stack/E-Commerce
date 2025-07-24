import { Footer, Header } from '@/components/layout/user'
import { ContactMain, FaqsTeaserMain } from '@/components/main/users'
import { ThemeToggler } from '@/components/reusable/shared'
import { useThemeContext } from '@/context/themeContext'
import { Toaster } from 'sonner'

const ContactPage = () => {
    const { theme } = useThemeContext()
    return (
        <>
            <Header />
            <ContactMain />
            <FaqsTeaserMain />
            <Footer />
            <ThemeToggler />
            <Toaster theme={theme as "light" | 'dark'} />
        </>
    )

}

export default ContactPage