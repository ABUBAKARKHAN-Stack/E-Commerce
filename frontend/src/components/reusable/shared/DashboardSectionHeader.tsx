import { Separator } from '@/components/ui/separator';
import React, { FC, JSX } from 'react'

type Props = {
    mainIcon: JSX.Element,
    mainHeading: string;
    subIcon?: JSX.Element;
    subText?: string;
    animateClassName: string
}

const DashboardSectionHeader: FC<Props> = ({
    mainIcon,
    mainHeading,
    subIcon,
    subText,
    animateClassName
}) => {

    return (
        <section className={`${animateClassName} flex pr-4 flex-col md:flex-row md:items-center md:justify-between py-4"`}>
            <div className="space-y-3 w-full">
                <h1 className="text-lg xsm:text-xl sm:text-2xl md:text-3xl text-gray-950 dark:text-white font-bold flex items-center gap-2">
                    {mainIcon}
                    {mainHeading}
                </h1>
                {
                    subText && subIcon && <p className="text-gray-900 dark:text-gray-300 font-bold font-mono text-xs xsm:text-sm sm:text-base flex items-center gap-2">
                        {subIcon}
                        {subText}
                    </p>
                }
                <Separator
                    className='w-full'
                />
            </div>
        </section>
    )
}

export default DashboardSectionHeader