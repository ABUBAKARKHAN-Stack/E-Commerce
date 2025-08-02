import { AdminSignInMain } from "@/components/main/admin";
import { ThemeToggler } from "@/components/reusable/shared";
import { Layout } from "@/components/layout/shared";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";

const AdminSignInPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <Layout>
      <ThemeToggler />
      <AdminSignInMain />
      <Toaster theme={resolvedTheme as "dark" | "light"} />
    </Layout>
  );
};

export default AdminSignInPage;
