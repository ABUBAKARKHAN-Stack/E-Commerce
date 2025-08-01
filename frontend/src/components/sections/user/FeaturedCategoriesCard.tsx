import { BlurFade } from "@/components/magicui/blur-fade";
import { useProductContext } from "@/context/productContext";
import { categoriesIconMap, staticCategoriesData } from "@/data/categories";
import { formattedCategory } from "@/utils/formatters";
import { FC, JSX } from "react";
import { Link } from "react-router-dom";

type RenderCategoryCardsProps = {
  category: string;
  title: string;
  icon: JSX.Element;
  i: number;
};

const RenderCategoryCards: FC<RenderCategoryCardsProps> = ({
  category,
  title,
  icon,
  i,
}) => {
  return (
    <BlurFade inView direction="right" delay={0.25 + i * 0.05} once={false}>
      <Link
        to={`/products/category/${category}`}
        className="xsm:w-40 xxs:w-50 flex h-40 w-[calc(100vw-32px)] flex-col items-center justify-center gap-y-3 rounded-sm border-0 bg-cyan-500 text-white shadow transition-all duration-300 ease-linear hover:scale-105 hover:border-[1.5px] hover:border-cyan-600/50 hover:bg-cyan-600/90 dark:bg-orange-500 dark:hover:border-orange-600/70 dark:hover:bg-orange-600/90"
      >
        {icon}
        <h4 className="px-2 text-center font-semibold text-wrap uppercase">
          {title}
        </h4>
      </Link>
    </BlurFade>
  );
};

const FeaturedCategoriesCard = () => {
  const { topCategories } = useProductContext();

  if (!topCategories || topCategories.length === 0) {
    return staticCategoriesData.map(({ icon, title, category }, i) => {
      return (
        <RenderCategoryCards
          title={title}
          icon={icon}
          category={category}
          key={i}
          i={i}
        />
      );
    });
  }

  return topCategories.map((category: string, i) => {
    let title = formattedCategory(category);
    return (
      <RenderCategoryCards
        title={title}
        icon={categoriesIconMap[category] || categoriesIconMap["default"]}
        category={category}
        key={i}
        i={i}
      />
    );
  });
};

export default FeaturedCategoriesCard;
