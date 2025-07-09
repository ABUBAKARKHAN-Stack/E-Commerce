import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useProductContext } from '@/context/productContext';
import { IProduct } from '@/types/main.types';
import { ArrowLeftToLineIcon, ArrowRight, ArrowRightCircle, DollarSign, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { RequireAuth } from '@/components/layout/user/RequireAuthForAction';
import { AddToCartButton, CategoryBadge, ProductCardHeaderButtons, ProductQuantitySelector } from '@/components/reusable/user';
import { Layout } from '@/components/layout/shared';

type Props = {
    isOpen: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    productId: string;
};

const ViewProduct: FC<Props> = ({ isOpen, onOpenChange, productId }) => {
    const { getProduct } = useProductContext();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [currentImageSrc, setCurrentImageSrc] = useState('');
    const [quantityCount, setQuantityCount] = useState(1);

    useEffect(() => {
        (async () => {
            try {
                const res = await getProduct(productId);
                setProduct(res);
                if (res) setCurrentImageSrc(res.thumbnails[0]);
            } catch (error) {
                setProduct(null);
            }
        })();
    }, [productId]);



    if (!product) return null;

    const avgRating = product.avgRating || 0;
    const totalReviews = product.totalReviews || 0;



    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="overflow-auto h-[95%] max-h-[550px] sm:!max-w-[610px] md:!max-w-2xl lg:!max-w-3xl w-full">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-950 dark:text-white">
                        Product Details
                    </DialogTitle>
                    <DialogDescription className="text-sm font-light text-gray-600 dark:text-gray-400 leading-relaxed">
                        Explore complete product information including specifications, pricing, stock availability, and customer reviews to make an informed purchase decision.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Image */}
                    <div className="relative space-y-4">
                        <div className="w-full h-64 relative">
                            <CategoryBadge
                                category={product.category}
                                className='absolute w-fit top-2 left-2 z-10'
                            />
                            <div className='bg-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-[99.5%] h-full p-4 rounded-xl dark:bg-[#2c2c2e]'>
                                <img
                                    src={currentImageSrc}
                                    alt={product.name + " Image"}
                                    className="object-contain size-52 drop-shadow-8px shadow-black"
                                />
                            </div>
                        </div>
                        <div className='flex gap-x-5'>
                            {
                                product.thumbnails.map((src) => {
                                    return (
                                        <div key={src}
                                            role="button"
                                            onClick={() => setCurrentImageSrc(src)}
                                            className={`xxs:size-28 size-20 border-2 border-accent-foreground/90 hover:cursor-pointer bg-accent-foreground/90 hover:bg-accent-foreground p-2 transition-[color,box-shadow] rounded-lg ${currentImageSrc === src && 'border-ring ring-ring/50 ring-[3px] dark:bg-orange-500/20 dark:hover:bg-orange-500/30 bg-cyan-500/20 hover:bg-cyan-500/30 shadow-xs'}`}>
                                            <img
                                                src={src}
                                                className='object-cover drop-shadow-2px shadow-accent'
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-between">
                        <div className="w-full space-y-4 text-sm">
                            {/* Product Title */}
                            <h2 className='font-semibold line-clamp-2 uppercase text-lg text-gray-900 dark:text-white'>
                                {product.name}
                            </h2>

                            {/* Ratings */}
                            {avgRating > 0 && (
                                <div className="flex items-center gap-x-0.5">
                                    {Array.from({ length: Math.ceil(avgRating) }, (_, i) => (
                                        <Star
                                            key={i}
                                            size={15}
                                            className='fill-cyan-500 dark:fill-orange-500 text-cyan-500 dark:text-orange-500'
                                        />
                                    ))}
                                    <span className='ml-1.5 text-xs font-medium text-gray-600 dark:text-gray-400'>
                                        ({totalReviews} reviews)
                                    </span>
                                </div>
                            )}

                            {/* Description */}
                            <p className='line-clamp-3 leading-relaxed tracking-wide dark:text-gray-300 text-gray-900 font-light text-sm'>
                                {product.description || 'No description available.'}
                            </p>

                            {/* Price */}
                            <h1 className='dark:text-orange-500 text-cyan-500 font-bold text-4xl'>
                                {product.price}$
                            </h1>

                            {/* Stock Info */}
                            <div className='flex justify-start gap-x-2 items-center w-full'>
                                <h4 className='font-light text-nowrap dark:text-gray-300 text-gray-900'>
                                    Total Stock Available:
                                </h4>
                                <h3 className='font-medium text-gray-900 dark:text-white'>
                                    {product.quantity}
                                </h3>
                            </div>

                            {/* Quantity Selector */}
                            <div className='flex items-center justify-between gap-x-5 mt-3'>
                                <div className='text-xs font-light space-y-px dark:text-gray-300 text-gray-900'>
                                    <p>Quantity</p>
                                    <p>(Pieces)</p>
                                </div>
                                <ProductQuantitySelector
                                    productQuantity={product.quantity}
                                    quantityCount={quantityCount}
                                    setQuantityCount={setQuantityCount}
                                />
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="flex justify-center items-center mt-6">
                            <AddToCartButton
                                productId={product._id}
                                quantity={quantityCount}
                            />
                        </div>
                    </div>
                </div>

                {/* View Full Page */}
                <div className="mt-6 flex justify-end">
                    <Link
                        to={`/product/${product._id}`}
                        className="flex items-center gap-x-1 text-sm font-semibold text-cyan-600 dark:text-orange-400 hover:underline transition-all duration-200 ease-linear hover:scale-110 transform hover:-translate-x-2"
                    >
                        View Full Page <ArrowRightCircle className='size-5' />
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewProduct;
