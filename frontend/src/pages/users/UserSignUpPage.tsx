import { UserSignUpMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { Layout } from "@/components/layout/shared";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";

const UserSignUpPage = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Layout>
      <ThemeToggler />
      <UserSignUpMain />
      <Toaster position="top-right" theme={resolvedTheme as "dark" | "light"} />
    </Layout>
  );
};

export default UserSignUpPage;
