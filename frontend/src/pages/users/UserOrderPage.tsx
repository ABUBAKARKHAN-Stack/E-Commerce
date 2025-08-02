import { UserOrderMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const UserOrderPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <UserOrderMain />
      <ThemeToggler />
      <Toaster theme={resolvedTheme as "light" | "dark"} />
    </>
  );
};

export default UserOrderPage;
