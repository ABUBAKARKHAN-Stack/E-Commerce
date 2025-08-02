import { UserForgotPasswordMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { Layout } from "@/components/layout/shared";
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "next-themes";

const UserForgotPasswordPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <Layout>
      <ThemeToggler />
      <UserForgotPasswordMain />
      <Toaster theme={resolvedTheme as "dark" | "light"} />
    </Layout>
  );
};

export default UserForgotPasswordPage;
