import { Footer, Header } from "@/components/layout/user";
import { CheckoutMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const CheckoutPage = () => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Header />
      <CheckoutMain />
      <Footer />
      <Toaster theme={resolvedTheme as "light" | "dark"} />
      <ThemeToggler />
    </>
  );
};

export default CheckoutPage;
