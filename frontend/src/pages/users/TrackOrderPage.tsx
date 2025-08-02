import { Footer, Header } from "@/components/layout/user";
import { TrackOrderMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const TrackOrderPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <Header />
      <TrackOrderMain />
      <Footer />
      <Toaster theme={resolvedTheme as "light" | "dark"} />
      <ThemeToggler />
    </>
  );
};

export default TrackOrderPage;
