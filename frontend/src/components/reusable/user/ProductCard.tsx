import { MagicCard } from '@/components/magicui/magic-card'
import { useThemeContext } from '@/context/themeContext'
import ProductCardHeaderButtons from './ProductCardHeaderButtons';
import CategoryBadge from './CategoryBadge';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { IProduct, IUser } from '@/types/main.types';
import { FC, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { useAuthContext } from '@/context/authContext';
import { successToast } from '@/utils/toastNotifications';
import { RequireAuth } from '@/components/layout/user/RequireAuthForAction';
import { useProductContext } from '@/context/productContext';

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
    const { user } = useAuthContext();
    const { wishlist } = useProductContext();
    const [quantityCount, setQuantityCount] = useState(1);
    const isDark = theme === "dark";


    const handleAddToCart = () => {
        if (!user) return;
        successToast("Products Added :)")
    }

    return (
        <>
            <MagicCard gradientSize={150} gradientColor={isDark ? "#262626" : "#ecfeff"} gradientFrom={isDark ? '#F15136' : '#0891b2'} gradientTo={isDark ? '#FBA740' : '#06b6d4'} className={`${forHome ? 'w-48 xl:w-50' : "w-full min-h-96 "} shadow-md rounded-t`}>
                <div>
                    <div className={`lg:group w-full h-48 xl:h-50 ${forHome ? 'w-48 xl:w-50' : "w-full"} relative top-px`}>

                        <ProductCardHeaderButtons
                            productId={_id}
                            user={user as IUser}
                            wishlist={wishlist}
                        />
                        <CategoryBadge category={category} />
                        <div className='bg-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-[99.5%] h-full p-4 rounded-t dark:bg-[#2c2c2e]'>
                            <img src={thumbnails[0]} alt={product.name + "Image"} className={`object-contain ${forHome ? 'size-39' : 'size-44'} drop-shadow-8px shadow-black`} />
                        </div>
                    </div>
                    <div className={`${forHome ? "flex justify-center items-center" : "hidden"}`}>
                        <RequireAuth>
                            <Button
                                onClick={handleAddToCart}
                                className='rounded-none w-[99%]'>
                                Add to Cart <ShoppingCart strokeWidth={2.5} className='size-4.5' />
                            </Button>
                        </RequireAuth>
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
                        <div className='flex h-9 border-2 dark:text-white text-black rounded-md w-full'>
                            <Button
                                size={"sm"}
                                variant={"secondary"}
                                className='focus-visible:ring bg-transparent rounded-r-none h-full w-full flex items-center justify-center'
                                onClick={() => {
                                    if (quantity > quantityCount) setQuantityCount((prev) => prev = prev + 1);
                                }}
                                disabled={quantityCount >= quantity}
                            ><Plus className='size-5 stroke-3 dark:text-orange-400 text-cyan-400' /></Button>
                            <Separator orientation="vertical" />
                            <div className='flex justify-center items-center w-full h-full'>
                                <span className='block text-base font-semibold'>{quantityCount}</span>
                            </div>
                            <Separator orientation="vertical" />
                            <Button
                                size={"sm"}
                                variant={"secondary"}
                                className='bg-transparent focus-visible:ring rounded-l-none h-full w-full flex items-center justify-center'
                                disabled={quantityCount === 1}
                                onClick={() => {
                                    if (quantityCount <= 1) return;
                                    setQuantityCount((prev) => prev = prev - 1)
                                }}
                            ><Minus className='size-5 stroke-3 dark:text-orange-400 text-cyan-400' /></Button>
                        </div>
                    </div>}

                    <div className={`${!forHome ? "flex justify-center items-center mt-4" : "hidden"}`}>
                        <RequireAuth>
                            <Button
                                onClick={handleAddToCart}
                                className='rounded-none text-base w-full'>
                                Add to Cart <ShoppingCart strokeWidth={2.5} className='size-5' />
                            </Button>
                        </RequireAuth>
                    </div>
                </div>
            </MagicCard>
        </>
    )
}

export default ProductCard