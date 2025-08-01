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
        className={`py-4" flex flex-col rounded bg-cyan-500 p-4 pr-4 md:flex-row md:items-center md:justify-between dark:bg-orange-500`}
      >
        <div className="w-full space-y-2">
          <h1 className="xsm:text-xl flex items-center gap-2 text-lg font-bold text-white sm:text-2xl md:text-3xl">
            {mainIcon}
            {mainHeading}
          </h1>
          <p className="xsm:text-sm flex items-center gap-2 text-xs tracking-wide text-cyan-100 sm:text-base dark:text-orange-100">
            {subIcon}
            {subText}
          </p>
        </div>
      </section>
      <div className="animate-pulse-slow -pulse absolute top-1/2 left-1/2 -z-10 h-24 w-full -translate-1/2 rounded bg-transparent shadow-lg shadow-cyan-500/40 dark:shadow-orange-400/40"></div>
    </div>
  );
};

export default DashboardMainHeader;
