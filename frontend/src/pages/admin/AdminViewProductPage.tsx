import { AdminViewProductMain } from "@/components/main/admin";
import { ThemeToggler } from "@/components/reusable/shared";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const AdminViewProductPage = () => {
  const {resolvedTheme} = useTheme();

  return (
    <>
      <ThemeToggler />
      <Toaster theme={resolvedTheme as "dark" | "light"} />
      <AdminViewProductMain />
    </>
  );
};

export default AdminViewProductPage;
