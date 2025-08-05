import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
}

export const Badge = ({
  className,
  variant = "default",
  ...props
}: BadgeProps) => {
  const variantClasses = {
    default:
      "bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700",
    success:
      "bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-900 dark:text-emerald-200 dark:border-emerald-700",
    warning:
      "bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-900 dark:text-amber-200 dark:border-amber-700",
    error:
      "bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-900 dark:text-rose-200 dark:border-rose-700",
    info:
      "bg-sky-100 text-sky-800 border border-sky-300 dark:bg-sky-900 dark:text-sky-200 dark:border-sky-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg px-2.5 py-0.5 text-sm font-medium transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
};
