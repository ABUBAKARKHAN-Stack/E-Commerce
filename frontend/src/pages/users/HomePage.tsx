import { ThemeToggler } from "@/components/reusable/shared"
import { Header } from '@/components/layout/user'
import {
  HeroMain,
  FeaturedCategoriesMain,
  TrendingProductsMain,
  WhyChooseUsMain
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
      <ThemeToggler />
    </>
  )
}

export default HomePage