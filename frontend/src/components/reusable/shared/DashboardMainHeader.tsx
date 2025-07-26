import { Separator } from '@/components/ui/separator';
import React, { FC, JSX } from 'react'

type Props = {
    mainIcon: JSX.Element,
    mainHeading: string;
    subIcon: JSX.Element;
    subText: string;
    animateClassName: string
}

const DashboardMainHeader: FC<Props> = ({
    mainIcon,
    mainHeading,
    subIcon,
    subText,
    animateClassName
}) => {

    return (
        <div className={`relative ${animateClassName}`}>
            <section className={`flex pr-4 dark:bg-orange-500 bg-cyan-500 p-4 rounded flex-col md:flex-row md:items-center md:justify-between py-4"`}>
                <div className="space-y-2 w-full">
                    <h1 className="text-lg xsm:text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                        {mainIcon}
                        {mainHeading}
                    </h1>
                    <p className="text-xs xsm:text-sm sm:text-base text-cyan-100 dark:text-orange-100 tracking-wide flex items-center gap-2">
                        {subIcon}
                        {subText}
                    </p>
                </div>

            </section>
            <div className='absolute  -z-10 top-1/2 left-1/2 -translate-1/2 shadow-lg h-24 rounded  w-full bg-transparent animate-pulse-slow shadow-cyan-500/40 dark:shadow-orange-400/40 -pulse'></div>
        </div>
    )
}

export default DashboardMainHeader