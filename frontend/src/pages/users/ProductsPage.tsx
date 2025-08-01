import { Footer, Header } from "@/components/layout/user";
import { ThemeToggler } from "@/components/reusable/shared";
import { Toaster } from "sonner";
import { useThemeContext } from "@/context/themeContext";
import { ProductsMain } from "@/components/main/users";

const ProductsPage = () => {
  const { theme } = useThemeContext();
  return (
    <>
      <Header />
      <ProductsMain />
      <Footer />
      <Toaster theme={theme as "light" | "dark"} />
      <ThemeToggler />
    </>
  );
};

export default ProductsPage;
