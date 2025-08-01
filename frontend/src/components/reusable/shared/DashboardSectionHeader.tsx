import { Separator } from "@/components/ui/separator";
import React, { FC, JSX } from "react";

type Props = {
  mainIcon: JSX.Element;
  mainHeading: string;
  subIcon?: JSX.Element;
  subText?: string;
  animateClassName: string;
};

const DashboardSectionHeader: FC<Props> = ({
  mainIcon,
  mainHeading,
  subIcon,
  subText,
  animateClassName,
}) => {
  return (
    <section
      className={`${animateClassName} py-4" flex flex-col pr-4 md:flex-row md:items-center md:justify-between`}
    >
      <div className="w-full space-y-3">
        <h1 className="xsm:text-xl flex items-center gap-2 text-lg font-bold text-gray-950 sm:text-2xl md:text-3xl dark:text-white">
          {mainIcon}
          {mainHeading}
        </h1>
        {subText && subIcon && (
          <p className="xsm:text-sm flex items-center gap-2 font-mono text-xs font-bold text-gray-900 sm:text-base dark:text-gray-300">
            {subIcon}
            {subText}
          </p>
        )}
        <Separator className="w-full" />
      </div>
    </section>
  );
};

export default DashboardSectionHeader;
