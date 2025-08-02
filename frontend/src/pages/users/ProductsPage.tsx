import { Footer, Header } from "@/components/layout/user";
import { ThemeToggler } from "@/components/reusable/shared";
import { Toaster } from "sonner";
import { ProductsMain } from "@/components/main/users";
import { useTheme } from "next-themes";

const ProductsPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <Header />
      <ProductsMain />
      <Footer />
      <Toaster theme={resolvedTheme as "light" | "dark"} />
      <ThemeToggler />
    </>
  );
};

export default ProductsPage;
