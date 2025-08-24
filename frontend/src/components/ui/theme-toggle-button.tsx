import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

import {
  AnimationStart,
  AnimationVariant,
  createAnimation,
} from "@/utils/animations/theme-animations";

interface ThemeToggleAnimationProps {
  variant?: AnimationVariant;
  start?: AnimationStart;
  showLabel?: boolean;
  url?: string;
}

export default function ThemeToggleButton({
  variant = "circle-blur",
  start = "top-left",
  showLabel = false,
  url = "",
}: ThemeToggleAnimationProps) {
  const { theme, setTheme } = useTheme();

  const styleId = "theme-transition-styles";

  const updateStyles = React.useCallback((css: string, name: string) => {
    if (typeof window === "undefined") return;

    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    console.log("style ELement", styleElement);
    console.log("name", name);

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;

    console.log("content updated");
  }, []);

  const toggleTheme = React.useCallback(() => {
    const animation = createAnimation(variant, start, url);

    updateStyles(animation.css, animation.name);

    if (typeof window === "undefined") return;

    const switchTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  }, [theme, setTheme]);

  return (
    <>
      <Button
        title={`Switch To ${theme === "dark" ? "Light" : "Dark"} Mode`}
        variant={"default"}
        onClick={toggleTheme}
        size="sm"
        name="Theme Toggle Button"
        className="xsm:top-3/4 fixed top-[85%] -right-1 z-50 rounded-l-full text-white duration-200 ease-linear hover:scale-90"
      >
        <SunIcon className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <MoonIcon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Theme Toggle </span>
        {showLabel && (
          <>
            <span className="absolute -top-10 hidden rounded-full border px-2 group-hover:block">
              {" "}
              variant = {variant}
            </span>
            <span className="absolute -bottom-10 hidden rounded-full border px-2 group-hover:block">
              {" "}
              start = {start}
            </span>
          </>
        )}
      </Button>
    </>
  );
}
