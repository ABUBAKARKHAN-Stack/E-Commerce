import { Footer, Header } from "@/components/layout/user";
import { WishlistMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const WishlistPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <Header />
      <WishlistMain />
      <Footer />
      <Toaster theme={resolvedTheme as "light" | "dark"} />
      <ThemeToggler />
    </>
  );
};

export default WishlistPage;
