import { UserResetPasswordMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { Layout } from "@/components/layout/shared";
import { Toaster } from "@/components/ui/sonner";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const UserResetPasswordPage = () => {
  const { resolvedTheme } = useTheme();
  const [urlParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<object | null>(null);

  useEffect(() => {
    const email = urlParams.get("email");
    const token = urlParams.get("token");
    setQueryParams({
      email,
      token,
    });
  }, []);

  return (
    <Layout>
      <UserResetPasswordMain queryParameters={queryParams} />
      <ThemeToggler />
      <Toaster theme={resolvedTheme as "light" | "dark"} />
    </Layout>
  );
};

export default UserResetPasswordPage;
