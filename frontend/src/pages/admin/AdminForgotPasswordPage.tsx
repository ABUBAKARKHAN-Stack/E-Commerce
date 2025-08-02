import { AdminForgotPasswordMain } from "@/components/main/admin";
import { ThemeToggler } from "@/components/reusable/shared";
import { Layout } from "@/components/layout/shared";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";

const AdminForgotPasswordPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <Layout>
      <ThemeToggler />
      <AdminForgotPasswordMain />
      <Toaster theme={resolvedTheme as "dark" | "light"} />
    </Layout>
  );
};

export default AdminForgotPasswordPage;
