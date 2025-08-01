import { Footer, Header } from "@/components/layout/user";
import { CheckoutMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { useThemeContext } from "@/context/themeContext";
import { Toaster } from "sonner";

const CheckoutPage = () => {
  const { theme } = useThemeContext();

  return (
    <>
      <Header />
      <CheckoutMain />
      <Footer />
      <Toaster theme={theme as "light" | "dark"} />
      <ThemeToggler />
    </>
  );
};

export default CheckoutPage;
