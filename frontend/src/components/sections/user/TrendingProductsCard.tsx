import { BlurFade } from '@/components/magicui/blur-fade';
import { MagicCard } from '@/components/magicui/magic-card';
import { CategoryBadge, ProductCard, ProductCardHeaderButtons } from '@/components/reusable/user';
import { Button } from '@/components/ui/button';
import { useProductContext } from '@/context/productContext';
import { useThemeContext } from '@/context/themeContext';
import { staticTrendingProductsData } from '@/data/trendingProducts'
import { IProduct } from '@/types/main.types';
import { ShoppingCart, Star } from 'lucide-react';

const TrendingProductsCard = () => {
    const { topRatedProducts } = useProductContext();
    const { theme } = useThemeContext();
    const isDark = theme === 'dark';

    if (!topRatedProducts || topRatedProducts.length === 0) {
        return (
            staticTrendingProductsData.map((p, i) => (
                <BlurFade key={i} inView direction='right' delay={0.25 + i * 0.05} once={false} >
                    <MagicCard gradientSize={150} gradientColor={isDark ? "#262626" : "#ecfeff"} gradientFrom={isDark ? '#F15136' : '#0891b2'} gradientTo={isDark ? '#FBA740' : '#06b6d4'} className='w-48 xl:w-50 shadow-md rounded-t'>
                        <div>
                            <div className='lg:group w-full size-48 xl:size-50 relative'>
                                <ProductCardHeaderButtons />
                                <CategoryBadge category={p.category} />
                                <div className='bg-gray-200 absolute top-px right-px flex justify-center items-center  w-[99%] h-full p-4 rounded-t dark:bg-[#2c2c2e]'>
                                    <img src={p.thumbnail} alt={p.name + "Image"} className='object-contain size-39 drop-shadow-8px shadow-black pt-3' />
                                </div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <Button className='rounded-none w-[99%]'>
                                    Add to Cart <ShoppingCart strokeWidth={2.5} className='size-4.5' />
                                </Button>
                            </div>
                        </div>
                        <div className='w-full p-2 space-y-1 mt-1.5 text-sm'>
                            <h2 className='font-semibold uppercase'>{p.name}</h2>
                            <h1 className='dark:text-orange-500 text-cyan-500 font-bold text-3xl'>{p.price}$</h1>
                            <div className='flex items-center gap-x-0.5'>
                                {Array.from(({ length: Math.round(p.avgRating) }), (_, i) => (
                                    <Star key={i} size={16} className='fill-cyan-500 dark:fill-orange-500 text-cyan-500 dark:text-orange-500' />
                                ))}
                                <span className='ml-1.5 text-xs font-medium'>({p.totalReviews})</span>
                            </div>
                        </div>
                    </MagicCard>
                </BlurFade>
            ))
        )
    }

    return (
        <>
            {
                topRatedProducts?.length > 0 && topRatedProducts?.map(((p: IProduct, i) => (
                    <BlurFade key={i} inView direction='right' delay={0.25 + i * 0.05} once={false} >
                        <ProductCard
                            forHome
                            product={p}
                        />
                    </BlurFade>
                )
                ))
            }
        </>
    )
}

export default TrendingProductsCard;