import { BlurFade } from '@/components/magicui/blur-fade';
import { LucideIcon, Smartphone } from 'lucide-react'
import React, { FC, Key } from 'react'
import { Link } from 'react-router-dom';


type FeaturedCategoriesCardProps = {
  icon: LucideIcon;
  categoryName: string;
}

const FeaturedCategoriesCard = () => {
  // const
  return (
    Array.from(({ length: 12 })).map((_,i) => (
      <BlurFade key={i} inView direction='right' delay={0.25 + i * 0.05} duration={0.2} once={false}>
        <Link to={'#'} className='xsm:w-40 xxs:w-50 w-[calc(100vw-32px)] h-40   shadow flex flex-col justify-center gap-y-3 items-center rounded-sm dark:bg-orange-500 bg-cyan-500 dark:hover:bg-orange-600/90 hover:bg-cyan-600/90 transition-all ease-linear border-0 hover:border-[1.5px] dark:hover:border-orange-600/70 hover:border-cyan-600/50 duration-300 hover:scale-105 text-white '>
          <Smartphone strokeWidth={1.1} size={50} />
          <h4 className='font-semibold uppercase'>Smartphones</h4>
        </Link>
      </BlurFade>
    ))
  )
}

export default FeaturedCategoriesCard