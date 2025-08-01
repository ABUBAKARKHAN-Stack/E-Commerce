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
import { useThemeContext } from "@/context/themeContext";
import { Toaster } from "sonner";

const AboutPage = () => {
  const { theme } = useThemeContext();
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
      <Toaster theme={theme as "light" | "dark"} />
    </>
  );
};

export default AboutPage;
