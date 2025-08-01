import { Layout } from "@/components/layout/shared";
import { AdminResetPasswordMain } from "@/components/main/admin";
import { ThemeToggler } from "@/components/reusable/shared";
import { Toaster } from "sonner";
import { useThemeContext } from "@/context/themeContext";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const AdminResetPasswordPage = () => {
  const [params] = useSearchParams();
  const { theme } = useThemeContext();
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
      <Toaster theme={theme as "dark" | "light"} />
    </Layout>
  );
};

export default AdminResetPasswordPage;
