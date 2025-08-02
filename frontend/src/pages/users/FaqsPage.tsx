import { Footer, Header } from "@/components/layout/user";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { FaqsMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const FaqsPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <Header />
      <ScrollProgress className="h-[2px]" />
      <FaqsMain fullFaqs />
      <Footer />
      <ThemeToggler />
      <Toaster theme={resolvedTheme as "light" | "dark"} />
    </>
  );
};

export default FaqsPage;
