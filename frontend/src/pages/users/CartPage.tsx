import { Footer, Header } from "@/components/layout/user";
import { CartMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const CartPage = () => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Header />
      <CartMain />
      <Footer />
      <Toaster theme={resolvedTheme as "light" | "dark"} />
      <ThemeToggler />
    </>
  );
};

export default CartPage;
