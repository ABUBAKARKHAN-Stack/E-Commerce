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
const HomePage = () => {

  return (
    <>
      <Header />
      <ScrollProgress className="h-[2px]"  />
      <HeroMain />
      <FeaturedCategoriesMain />
      <TrendingProductsMain />
      <WhyChooseUsMain />
      <TestimonialsMain />
      <NewsletterCTASectionMain />
      <Footer />
      <ThemeToggler />
    </>
  )
}

export default HomePage