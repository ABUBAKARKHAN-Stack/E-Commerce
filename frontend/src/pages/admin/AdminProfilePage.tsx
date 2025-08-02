import { AdminProfileMain } from "@/components/main/admin";
import { ThemeToggler } from "@/components/reusable/shared";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const AdminProfilePage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <AdminProfileMain />
      <ThemeToggler />
      <Toaster theme={resolvedTheme as "light" | "dark"} />
    </>
  );
};

export default AdminProfilePage;
