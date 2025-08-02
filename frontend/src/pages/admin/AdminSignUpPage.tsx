import { AdminSignUpMain } from "@/components/main/admin";
import { ThemeToggler } from "@/components/reusable/shared";
import { Layout } from "@/components/layout/shared";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";

const AdminSignUpPage = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Layout>
      <ThemeToggler />
      <AdminSignUpMain />
      <Toaster position="top-right" theme={resolvedTheme as "dark" | "light"} />
    </Layout>
  );
};

export default AdminSignUpPage;
