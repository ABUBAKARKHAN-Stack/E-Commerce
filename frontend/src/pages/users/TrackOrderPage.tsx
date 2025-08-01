import { Footer, Header } from "@/components/layout/user";
import { TrackOrderMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { useThemeContext } from "@/context/themeContext";
import { Toaster } from "sonner";

const TrackOrderPage = () => {
  const { theme } = useThemeContext();
  return (
    <>
      <Header />
      <TrackOrderMain />
      <Footer />
      <Toaster theme={theme as "light" | "dark"} />
      <ThemeToggler />
    </>
  );
};

export default TrackOrderPage;
