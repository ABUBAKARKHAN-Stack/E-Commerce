import { Footer, Header } from "@/components/layout/user";
import { WishlistMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { useThemeContext } from "@/context/themeContext";
import { Toaster } from "sonner";

const WishlistPage = () => {
  const { theme } = useThemeContext();
  return (
    <>
      <Header />
      <WishlistMain />
      <Footer />
      <Toaster theme={theme as "light" | "dark"} />
      <ThemeToggler />
    </>
  );
};

export default WishlistPage;
