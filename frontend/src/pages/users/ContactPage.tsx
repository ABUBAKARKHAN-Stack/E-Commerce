import { Footer, Header } from "@/components/layout/user";
import { ContactMain, FaqsTeaserMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const ContactPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <Header />
      <ContactMain />
      <FaqsTeaserMain />
      <Footer />
      <ThemeToggler />
      <Toaster theme={resolvedTheme as "light" | "dark"} />
    </>
  );
};

export default ContactPage;
