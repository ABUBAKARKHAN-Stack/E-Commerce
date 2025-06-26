import { BlurFade } from '@/components/magicui/blur-fade';
import { useProductContext } from '@/context/productContext';
import { categoriesIconMap, staticCategoriesData } from '@/data/categories';
import { FC, JSX } from 'react'
import { Link } from 'react-router-dom';

type RenderCategoryCardsProps = {
  category: string;
  title: string;
  icon: JSX.Element;
  i: number
}

const RenderCategoryCards: FC<RenderCategoryCardsProps> = ({
  category,
  title,
  icon,
  i
}) => {
  return (
    <BlurFade inView direction='right' delay={0.25 + i * 0.05} once={false}>
      <Link to={`/products/category/${category}`} className='xsm:w-40 xxs:w-50 w-[calc(100vw-32px)] h-40 shadow flex flex-col justify-center gap-y-3 items-center rounded-sm dark:bg-orange-500 bg-cyan-500 dark:hover:bg-orange-600/90 hover:bg-cyan-600/90 transition-all ease-linear border-0 hover:border-[1.5px] dark:hover:border-orange-600/70 hover:border-cyan-600/50 duration-300 hover:scale-105 text-white'>
        {icon}
        <h4 className='font-semibold px-2 text-wrap text-center uppercase'>{title}</h4>
      </Link>
    </BlurFade>
  )
}

const FeaturedCategoriesCard = () => {
 const { categories } = useProductContext();
  
  if (!categories || categories.length === 0) {
    return staticCategoriesData.map(({ icon, title, category }, i) => {
      return (
        <RenderCategoryCards
          title={title}
          icon={icon}
          category={category}
          key={i}
          i={i}
        />
      )
    })
  }

  return (
    categories.map((category: string, i) => {
      let title = category.replace("-", " ")
      return (<RenderCategoryCards
        title={title}
        icon={categoriesIconMap[category] || categoriesIconMap["default"]}
        category={category}
        key={i}
        i={i}
      />
      )
    })
  )
}

export default FeaturedCategoriesCard;