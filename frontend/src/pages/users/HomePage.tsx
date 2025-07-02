import { ThemeToggler } from "@/components/reusable/shared"
import { Footer, Header } from '@/components/layout/user'
import {
  HeroMain,
  FeaturedCategoriesMain,
  TrendingProductsMain,
  WhyChooseUsMain,
  TestimonialsMain,
  NewsletterCTASectionMain
} from '@/components/main/users'
import { ScrollProgress } from "@/components/magicui/scroll-progress"
import { Toaster } from "sonner"
import { useThemeContext } from "@/context/themeContext"
const HomePage = () => {
    const { theme } = useThemeContext();

  return (
    <>
      <Header />
      <ScrollProgress className="h-[2px]" />
      <HeroMain />
      <FeaturedCategoriesMain />
      <TrendingProductsMain />
      <WhyChooseUsMain />
      <TestimonialsMain />
      <NewsletterCTASectionMain />
      <Footer />
      <ThemeToggler />
      <Toaster theme={theme as "light" | 'dark'} />
    </>
  )
}

export default HomePage