import { AdminOrdersMain } from "@/components/main/admin";
import { ThemeToggler } from "@/components/reusable/shared";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const AdminOrdersPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <ThemeToggler />
      <AdminOrdersMain />
      <Toaster theme={resolvedTheme as "dark" | "light"} />
    </>
  );
};

export default AdminOrdersPage;
