import { Layout } from "@/components/layout/shared";
import { AdminResetPasswordMain } from "@/components/main/admin";
import { ThemeToggler } from "@/components/reusable/shared";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "next-themes";

const AdminResetPasswordPage = () => {
  const [params] = useSearchParams();
  const { resolvedTheme } = useTheme();
  const [queryParams, setQueryParams] = useState<object | null>(null);

  console.log(queryParams);

  useEffect(() => {
    const email = params.get("email");
    const token = params.get("token");

    setQueryParams({
      email,
      token,
    });
  }, []);
  return (
    <Layout>
      <ThemeToggler />
      <AdminResetPasswordMain queryParameters={queryParams} />
      <Toaster theme={resolvedTheme as "dark" | "light"} />
    </Layout>
  );
};

export default AdminResetPasswordPage;
