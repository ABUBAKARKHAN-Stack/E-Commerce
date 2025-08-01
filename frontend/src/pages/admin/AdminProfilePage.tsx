import { AdminProfileMain } from "@/components/main/admin";
import { ThemeToggler } from "@/components/reusable/shared";
import { useThemeContext } from "@/context/themeContext";
import React from "react";
import { Toaster } from "sonner";

const AdminProfilePage = () => {
  const { theme } = useThemeContext();
  return (
    <>
      <AdminProfileMain />
      <ThemeToggler />
      <Toaster theme={theme as "light" | "dark"} />
    </>
  );
};

export default AdminProfilePage;
