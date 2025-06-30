import { MagicCard } from '@/components/magicui/magic-card'
import { useThemeContext } from '@/context/themeContext'
import ProductCardHeaderButtons from './ProductCardHeaderButtons';
import CategoryBadge from './CategoryBadge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { IProduct } from '@/types/main.types';
import { FC } from 'react';

type Props = {
    product: IProduct;
    forHome: boolean;
}

const ProductCard: FC<Props> = ({
    product,
    forHome
}) => {
    const {
        category,
        thumbnails,
        name,
        price,
        avgRating,
        totalReviews,
        _id,
        description,
        quantity,
        reviews
    } = product;
    const { theme } = useThemeContext();
    const isDark = theme === "dark";

    return (
        <MagicCard gradientSize={150} gradientColor={isDark ? "#262626" : "#ecfeff"} gradientFrom={isDark ? '#F15136' : '#0891b2'} gradientTo={isDark ? '#FBA740' : '#06b6d4'} className={`${forHome ? 'w-48 xl:w-50' : "w-full min-h-96"} shadow-md rounded-t`}>
            <div>
                <div className={`lg:group w-full h-48 xl:h-50 ${forHome ? 'w-48 xl:w-50' : "w-full"} relative`}>
                    <ProductCardHeaderButtons />
                    <CategoryBadge category={category} />
                    <div className='bg-gray-200 absolute top-[50.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center  w-[99.5%] h-full p-4 rounded-t dark:bg-[#2c2c2e]'>
                        <img src={thumbnails[0]} alt={product.name + "Image"} className={`object-contain ${forHome ? 'size-39' : 'size-44'} drop-shadow-8px shadow-black pt-3`} />
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <Button className='rounded-none w-[99%]'>
                        Add to Cart <ShoppingCart strokeWidth={2.5} className='size-4.5' />
                    </Button>
                </div>
            </div>
            <div className='w-full p-2 space-y-1 mt-1.5 text-sm'>
                <h2 className='font-semibold line-clamp-1 uppercase'>{name}</h2>
                {!forHome && <p className='line-clamp-2 leading-relaxed tracking-wide dark:text-gray-300 text-gray-900 font-light text-xs'>{description}</p>}
                <h1 className='dark:text-orange-500 text-cyan-500 font-bold text-3xl'>{price}$</h1>
                <div className='flex items-center gap-x-0.5'>
                    {Array.from(({ length: Math.ceil(Math.round(avgRating)) }), (_, i) => (
                        <Star key={i} size={16} className='fill-cyan-500 dark:fill-orange-500 text-cyan-500 dark:text-orange-500' />
                    ))}
                    <span className='ml-1.5 text-xs font-medium'>({totalReviews})</span>
                </div>
            </div>
        </MagicCard>
    )
}

export default ProductCard