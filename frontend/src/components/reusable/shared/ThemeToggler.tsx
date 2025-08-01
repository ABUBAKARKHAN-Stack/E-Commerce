import { useThemeContext } from "@/context/themeContext";
import { Sun, MoonIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useThemeContext();
  const handleTheme = () => {
    toggleTheme();
  };

  return (
    <Button
      title={`Switch To ${theme === "dark" ? "Light" : "Dark"} Mode`}
      variant={"default"}
      size="sm"
      onClick={handleTheme}
      className="xsm:top-3/4 fixed top-[85%] -right-1 z-50 rounded-l-full text-white duration-200 ease-linear hover:scale-90"
    >
      <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
};

export default ThemeToggler;
