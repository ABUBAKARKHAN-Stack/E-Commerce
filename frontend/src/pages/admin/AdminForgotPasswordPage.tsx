import { AdminForgotPasswordMain } from "@/components/main/admin";
import { ThemeToggler } from "@/components/reusable/shared";
import { Layout } from "@/components/layout/shared";
import { useThemeContext } from "@/context/themeContext";
import { Toaster } from "sonner";

const AdminForgotPasswordPage = () => {
  const { theme } = useThemeContext();
  return (
    <Layout>
      <ThemeToggler />
      <AdminForgotPasswordMain />
      <Toaster theme={theme as "dark" | "light"} />
    </Layout>
  );
};

export default AdminForgotPasswordPage;
