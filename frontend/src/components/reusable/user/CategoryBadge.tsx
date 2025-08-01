import React, { FC } from "react";

type Props = {
  category: string;
  className?: string;
  bagdeClass?: string;
};

const CategoryBadge: FC<Props> = ({ category, className, bagdeClass }) => {
  return (
    <div
      className={`absolute ${className} top-[7px] right-1 z-10 rounded-full shadow-xs shadow-cyan-400 dark:shadow-orange-400`}
    >
      <p
        className={`px-2 py-[2px] ${bagdeClass} w-fit rounded-full bg-cyan-500 text-[10px] font-bold text-white dark:bg-orange-500`}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </p>
    </div>
  );
};

export default CategoryBadge;
