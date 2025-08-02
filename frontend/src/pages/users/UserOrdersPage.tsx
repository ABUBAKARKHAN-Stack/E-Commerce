import { UserOrdersMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const UserOrdersPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <UserOrdersMain />
      <ThemeToggler />
      <Toaster theme={resolvedTheme as "light" | "dark"} />
    </>
  );
};

export default UserOrdersPage;
