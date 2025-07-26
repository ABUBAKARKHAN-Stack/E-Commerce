import React from "react";
import { cn } from "@/lib/utils"; 

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "success" | "warning" | "error" | "info";
}

export const Badge = ({ className, variant = "default", ...props }: BadgeProps) => {
    const variantClasses = {
        default: "bg-cyan-500 text-cyan-50 border border-cyan-300 dark:border-orange-300 dark:bg-orange-500 dark:text-orange-100",
        success: "bg-green-100 text-green-700 border border-green-300 dark:bg-green-900 dark:text-green-300",
        warning: "bg-yellow-100 text-yellow-700 border border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300",
        error: "bg-red-100 text-red-700 border border-red-300 dark:bg-red-900 dark:text-red-300",
        info: "bg-cyan-100 text-cyan-700 border border-cyan-300 dark:bg-cyan-900 dark:text-cyan-300",
    };

    return (
        <span
            className={cn(
                "inline-block px-3 py-1 text-sm font-medium rounded-md capitalize",
                variantClasses[variant],
                className
            )}
            {...props}
        />
    );
};
