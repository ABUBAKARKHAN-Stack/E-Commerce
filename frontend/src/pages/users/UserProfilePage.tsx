import { ThemeToggler } from "@/components/reusable/shared";
import { Toaster } from "sonner";
import { UserProfileMain } from "@/components/main/users";
import { useTheme } from "next-themes";

const UserProfilePage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <UserProfileMain />
      <ThemeToggler />
      <Toaster theme={resolvedTheme as "light" | "dark"} />
    </>
  );
};

export default UserProfilePage;
