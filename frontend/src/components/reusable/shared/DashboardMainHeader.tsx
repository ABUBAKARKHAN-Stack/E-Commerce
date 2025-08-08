import { Separator } from "@/components/ui/separator";
import React, { FC, JSX } from "react";

type Props = {
    mainIcon: JSX.Element;
    mainHeading: string;
    subIcon: JSX.Element;
    subText: string;
    animateClassName?: string;
};

const DashboardMainHeader: FC<Props> = ({
    mainIcon,
    mainHeading,
    subIcon,
    subText,
    animateClassName,
}) => {
    return (
        <div className={`relative ${animateClassName}`}>
            <section
                role="banner"
                className="relative flex flex-col selection:bg-black items-start justify-center gap-3 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-orange-500 dark:to-orange-600 px-4 py-5 xsm:p-5"
            >
                {/* Glow effect */}
                <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full animate-pulse-slow rounded-lg shadow-2xl shadow-cyan-500/30 dark:shadow-orange-400/30" />

                {/* Main Heading */}
                <h1 className="flex items-center gap-2 text-lg font-bold text-white sm:text-2xl md:text-3xl">
                    <span className="flex-shrink-0 text-base sm:text-xl md:text-2xl">{mainIcon}</span>
                    <span>{mainHeading}</span>
                </h1>

                {/* Subtext */}
                <p className="flex items-center gap-2 text-xs font-medium tracking-wide text-cyan-100 sm:text-sm dark:text-orange-100">
                    <span className="flex-shrink-0 text-xs sm:text-sm">{subIcon}</span>
                    <span>{subText}</span>
                </p>
            </section>
        </div>
    );
};

export default DashboardMainHeader;
