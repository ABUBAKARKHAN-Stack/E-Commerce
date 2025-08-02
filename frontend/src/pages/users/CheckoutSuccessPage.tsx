import { Toaster } from "sonner";
import { ThemeToggler } from "@/components/reusable/shared";
import { CheckoutSuccessMain } from "@/components/main/users";
import { useTheme } from "next-themes";

const CheckoutSuccessPage = () => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <CheckoutSuccessMain />
      <Toaster theme={resolvedTheme as "dark" | "light"} />
      <ThemeToggler />
    </>
  );
};

export default CheckoutSuccessPage;
