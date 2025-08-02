import { Footer, Header } from "@/components/layout/user";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import {
  AboutHeroMain,
  FaqsMain,
  NewsletterCTASectionMain,
  TestimonialsMain,
  WhyChooseUsMain,
} from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const AboutPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <Header />
      <ScrollProgress className="h-[2px]" />
      <AboutHeroMain />
      <WhyChooseUsMain />
      <TestimonialsMain />
      <FaqsMain fullFaqs={false} />
      <NewsletterCTASectionMain />
      <Footer />
      <ThemeToggler />
      <Toaster theme={resolvedTheme as "light" | "dark"} />
    </>
  );
};

export default AboutPage;
