import { UserSignInMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { Layout } from "@/components/layout/shared";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";

const UserSignInPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <Layout>
      <ThemeToggler />
      <UserSignInMain />
      <Toaster theme={resolvedTheme as "dark" | "light"} />
    </Layout>
  );
};

export default UserSignInPage;
