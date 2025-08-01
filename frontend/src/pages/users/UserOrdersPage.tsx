import { UserOrdersMain } from "@/components/main/users";
import { ThemeToggler } from "@/components/reusable/shared";
import { useThemeContext } from "@/context/themeContext";
import { Toaster } from "sonner";

const UserOrdersPage = () => {
  const { theme } = useThemeContext();
  return (
    <>
      <UserOrdersMain />
      <ThemeToggler />
      <Toaster theme={theme as "light" | "dark"} />
    </>
  );
};

export default UserOrdersPage;
