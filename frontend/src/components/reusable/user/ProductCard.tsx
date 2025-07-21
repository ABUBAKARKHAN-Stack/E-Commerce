import { MagicCard } from '@/components/magicui/magic-card'
import { useThemeContext } from '@/context/themeContext'
import ProductCardHeaderButtons from './ProductCardHeaderButtons';
import CategoryBadge from './CategoryBadge';
import { Star } from 'lucide-react';
import { IProduct, IUser } from '@/types/main.types';
import { FC, useState } from 'react';
import { useAuthContext } from '@/context/authContext';
import { useProductContext } from '@/context/productContext';
import ProductQuantitySelector from './ProductQuantitySelector';
import AddToCartButton from './AddToCartButton';

type Props = {
    product: IProduct;
    forHome: boolean;
    usingLoaderData?: boolean;
}

const ProductCard: FC<Props> = ({
    product,
    forHome,
    usingLoaderData = false
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
        // reviews
    } = product;
    const { theme } = useThemeContext();
    const { user } = useAuthContext();
    const { wishlist } = useProductContext();
    const [quantityCount, setQuantityCount] = useState(1);
    const isDark = theme === "dark";

    return (
        <>
            <MagicCard gradientSize={150} gradientColor={isDark ? "#262626" : "#ecfeff"} gradientFrom={isDark ? '#F15136' : '#0891b2'} gradientTo={isDark ? '#FBA740' : '#06b6d4'} className={`${forHome ? 'w-48 xl:w-50' : "w-full min-h-96 "} shadow-md rounded-t`}>
                <div>
                    <div className={`lg:group w-full h-48 xl:h-50 ${forHome ? 'w-48 xl:w-50' : "w-full"} relative top-px`}>
                        <ProductCardHeaderButtons
                            productId={_id}
                            user={user as IUser}
                            wishlist={wishlist}
                            usingLoaderData={usingLoaderData}
                        />
                        <CategoryBadge category={category} />
                        <div className='bg-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-[99.5%] h-full p-4 rounded-t dark:bg-[#2c2c2e]'>
                            <img src={thumbnails[0]} alt={product.name + "Image"} className={`object-contain ${forHome ? 'size-39' : 'size-44'} drop-shadow-8px shadow-black`} />
                        </div>
                    </div>
                    <div className={`${forHome ? "flex justify-center items-center" : "hidden"}`}>
                        <AddToCartButton
                            stock={quantity}
                            productId={_id}
                            quantity={quantityCount}
                        />
                    </div>
                </div>
                <div className='w-full p-3 space-y-2 mt-2 text-sm'>
                    <h2 className='font-semibold line-clamp-1 uppercase'>{name}</h2>

                    {!forHome && <div className={`${avgRating > 0 ? 'flex items-center gap-x-0.5' : "hidden"}`}>
                        {Array.from(({ length: Math.ceil(Math.ceil(avgRating)) }), (_, i) => (
                            <Star key={i} size={15} className='fill-cyan-500 dark:fill-orange-500 text-cyan-500 dark:text-orange-500' />
                        ))
                        }
                    </div>}

                    {!forHome && <p className='line-clamp-2 leading-relaxed tracking-wide dark:text-gray-300 text-gray-900 font-light text-xs'>{description}</p>}

                    <h1 className='dark:text-orange-500 text-cyan-500 font-bold text-3xl'>{price}$</h1>

                    {!forHome && <div className='flex justify-start gap-x-2 items-center w-full'>
                        <h4 className='font-light text-nowrap dark:text-gray-300 text-gray-900'>Total Stock Available:</h4>
                        <h3 className='font-medium'>{quantity}</h3>
                    </div>}

                    {forHome && <div className='flex items-center gap-x-0.5'>
                        {Array.from(({ length: Math.ceil(Math.round(avgRating)) }), (_, i) => (
                            <Star key={i} size={16} className='fill-cyan-500 dark:fill-orange-500 text-cyan-500 dark:text-orange-500' />
                        ))}
                        <span className='ml-1.5 text-xs font-medium'>({totalReviews})</span>
                    </div>}

                    {!forHome && <div className='flex items-center justify-between gap-x-5 mt-3'>
                        <div className='text-xs font-light space-y-px dark:text-gray-300 text-gray-900'>
                            <p>Quantity</p>
                            <p>(Pieces)</p>
                        </div>
                        <ProductQuantitySelector
                            quantityCount={quantityCount}
                            setQuantityCount={setQuantityCount}
                            productQuantity={quantity}
                        />
                    </div>}

                    <div className={`${!forHome ? "flex justify-center items-center mt-4" : "hidden"}`}>
                        <AddToCartButton
                            stock={quantity}
                            productId={_id}
                            quantity={quantityCount}
                        />
                    </div>
                </div>
            </MagicCard>
        </>
    )
}

export default ProductCard