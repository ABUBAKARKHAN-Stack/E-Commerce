import React, { FC } from 'react'


type Props = {
    category: string;
    className?: string;
    bagdeClass?: string
}

const CategoryBadge: FC<Props> = ({
    category,
    className,
    bagdeClass
}) => {
    return (
        <div className={`absolute ${className} z-10 top-[7px] right-1 shadow-xs dark:shadow-orange-400 shadow-cyan-400 rounded-full`}>
            <p className={`px-2 py-[2px] ${bagdeClass} text-[10px] text-white font-bold w-fit dark:bg-orange-500 rounded-full bg-cyan-500`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
            </p>
        </div>
    )
}

export default CategoryBadge