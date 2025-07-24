import  { FC } from 'react'
import { BlurFade } from '@/components/magicui/blur-fade'

type SectionHeaderProps = {
    mainHeading: string;
    subText: string;
    animateOnce?: boolean;
    forHome?: boolean;
}
const SectionHeader: FC<SectionHeaderProps> = ({ mainHeading, subText, animateOnce = false, forHome = true }) => {
    return (
        <div className='relative w-full flex  flex-col gap-y-4 justify-center items-center'>
            <BlurFade direction="down" once={animateOnce} delay={forHome ? 0.25 : 0.2} inView>
                <h1 className='text-gray-950 dark:text-white text-center text-2xl xsm:text-4xl md:text-5xl xl:text-6xl font-bold'>
                    {mainHeading}
                </h1>
            </BlurFade>
            <BlurFade once={animateOnce} direction="down" delay={forHome ? (0.25 * 2) : (0.2 * 2)} inView>
                <p className='text-sm md:text-base text-wrap text-center xl:text-xl text-gray-900 dark:text-gray-300 mb-6'>
                    {subText}
                </p>
            </BlurFade>
        </div>
    )
}

export default SectionHeader