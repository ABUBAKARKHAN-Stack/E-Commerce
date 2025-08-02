import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import {
  CategoryBadge,
  ProductCard,
  ProductCardHeaderButtons,
} from "@/components/reusable/user";
import { Button } from "@/components/ui/button";
import { useProductContext } from "@/context/productContext";
import { staticTrendingProductsData } from "@/data/trendingProducts";
import { IProduct } from "@/types/main.types";
import { ShoppingCart, Star } from "lucide-react";
import { useTheme } from "next-themes";

const TrendingProductsCard = () => {
  const { topRatedProducts } = useProductContext();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  if (!topRatedProducts || topRatedProducts.length === 0) {
    return staticTrendingProductsData.map((p, i) => (
      <BlurFade
        key={i}
        inView
        direction="right"
        delay={0.25 + i * 0.05}
        once={false}
      >
        <MagicCard
          gradientSize={150}
          gradientColor={isDark ? "#262626" : "#ecfeff"}
          gradientFrom={isDark ? "#F15136" : "#0891b2"}
          gradientTo={isDark ? "#FBA740" : "#06b6d4"}
          className="w-48 rounded-t shadow-md xl:w-50"
        >
          <div>
            <div className="lg:group relative size-48 w-full xl:size-50">
              <CategoryBadge category={p.category} />
              <div className="absolute top-px right-px flex h-full w-[99%] items-center justify-center rounded-t bg-gray-200 p-4 dark:bg-[#2c2c2e]">
                <img
                  src={p.thumbnail}
                  alt={p.name + "Image"}
                  className="drop-shadow-8px size-39 object-contain pt-3 shadow-black"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Button className="w-[99%] rounded-none">
                Add to Cart{" "}
                <ShoppingCart strokeWidth={2.5} className="size-4.5" />
              </Button>
            </div>
          </div>
          <div className="mt-1.5 w-full space-y-1 p-2 text-sm">
            <h2 className="font-semibold uppercase">{p.name}</h2>
            <h1 className="text-3xl font-bold text-cyan-500 dark:text-orange-500">
              {p.price}$
            </h1>
            <div className="flex items-center gap-x-0.5">
              {Array.from({ length: Math.round(p.avgRating) }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-cyan-500 text-cyan-500 dark:fill-orange-500 dark:text-orange-500"
                />
              ))}
              <span className="ml-1.5 text-xs font-medium">
                ({p.totalReviews})
              </span>
            </div>
          </div>
        </MagicCard>
      </BlurFade>
    ));
  }

  return (
    <>
      {topRatedProducts?.length > 0 &&
        topRatedProducts?.map((p: IProduct, i) => (
          <BlurFade
            key={i}
            inView
            direction="right"
            delay={0.25 + i * 0.05}
            once={false}
          >
            <ProductCard forHome product={p} />
          </BlurFade>
        ))}
    </>
  );
};

export default TrendingProductsCard;
