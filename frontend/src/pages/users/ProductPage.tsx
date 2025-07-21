import { Footer, Header } from '@/components/layout/user';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import { ProductMain, ProductReviewsMain } from '@/components/main/users';
import { ThemeToggler } from '@/components/reusable/shared';
import { useThemeContext } from '@/context/themeContext';
import { useParams } from 'react-router-dom'
import { Toaster } from 'sonner';

const ProductPage = () => {
  const { productId } = useParams();
  const { theme } = useThemeContext();

  if (!productId) return;

  return (
    <>
      <Header />
      <ScrollProgress className="h-[2px]" />
      <ProductMain productId={productId} />
      <ProductReviewsMain productId={productId} />
      <Footer />
      <ThemeToggler />
      <Toaster theme={theme as "light" | 'dark'} />
    </>
  )
}

export default ProductPage