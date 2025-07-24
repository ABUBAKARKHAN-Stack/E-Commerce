import { Footer, Header } from '@/components/layout/user'
import { ScrollProgress } from '@/components/magicui/scroll-progress'
import { FaqsMain } from '@/components/main/users'
import { ThemeToggler } from '@/components/reusable/shared'
import { useThemeContext } from '@/context/themeContext'
import { Toaster } from 'sonner'

const FaqsPage = () => {
    const { theme } = useThemeContext()
    return (
        <>
            <Header />
            <ScrollProgress className="h-[2px]" />
            <FaqsMain fullFaqs />
            <Footer />
            <ThemeToggler />
            <Toaster theme={theme as "light" | 'dark'} />
        </>
    )
}

export default FaqsPage