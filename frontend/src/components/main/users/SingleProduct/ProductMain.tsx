import { Layout } from '@/components/layout/shared';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AddReviewForm, AddToCartButton, CategoryBadge,  ProductQuantitySelector, SectionHeader, WaveDivider } from '@/components/reusable/user';
import { ProductImagesGallery, ProductReviewsList } from '@/components/sections/user';
import { useProductContext } from '@/context/productContext';
import { IProduct } from '@/types/main.types';
import { ArrowLeft, Star } from 'lucide-react';
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
    productId: string | undefined
}

const ProductMain: FC<Props> = ({
    productId
}) => {
    const { getProduct } = useProductContext();
    const [product, setProduct] = useState<IProduct | null>(null)
    const navigate = useNavigate();
    const [quantityCount, setQuantityCount] = useState(1);

    useEffect(() => {
        ; (
            async () => {
                if (productId) {
                    const res = await getProduct(productId);
                    setProduct(res)
                }
            }
        )();
    }, [productId])


    if (!product) {
        return <h1>Getting....</h1>
    }



    return (
        <main
            className='min-w-screen w-full overflow-x-hidden h-full py-10 bg-background relative border-b-2
    '>
            <Layout>
                <BlurFade
                    delay={0.1}
                    duration={1}
                    className='relative w-fit mx-auto'                >
                    <SectionHeader
                        mainHeading={product.name}
                        subText={product.description}
                        animateOnce
                    />
                    <WaveDivider
                        position='bottom'
                        svgClass='h-2'
                        className='-z-10'
                    />
                </BlurFade>
                <section className='mt-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <ProductImagesGallery
                        thumbnails={product.thumbnails}
                    />

                    {/* Product Info */}
                    <div className="flex flex-col justify-between">
                        <div className="w-full space-y-4 text-sm">
                            <CategoryBadge
                                category={product.category}
                                className='static w-fit'
                            />
                            {/* Product Title */}
                            <h2 className='font-semibold line-clamp-2 uppercase text-2xl text-gray-900 dark:text-white'>
                                {product.name}
                            </h2>
                            {/* Ratings */}
                            {product.avgRating > 0 && (
                                <div className="flex items-center gap-x-0.5">
                                    {Array.from({ length: Math.ceil(product.avgRating) }, (_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            className='fill-cyan-500 dark:fill-orange-500 text-cyan-500 dark:text-orange-500'
                                        />
                                    ))}
                                    <span className='ml-1.5 text-sm font-medium text-gray-600 dark:text-gray-400'>
                                        ({product.totalReviews} reviews)
                                    </span>
                                </div>
                            )}

                            {/* Description */}
                            <p className='line-clamp-3 leading-relaxed tracking-wide dark:text-gray-300 text-gray-900 font-light text-lg'>
                                {product.description || 'No description available.'}
                            </p>

                            {/* Price */}
                            <h1 className='dark:text-orange-500 text-cyan-500 font-bold text-4xl'>
                                {product.price}$
                            </h1>

                            {/* Stock Info */}
                            <div className='flex justify-start text-base gap-x-2 items-center w-full'>
                                <h4 className='font-light text-nowrap dark:text-gray-300 text-gray-900'>
                                    Total Stock Available:
                                </h4>
                                <h3 className='font-medium text-gray-900 dark:text-white'>
                                    {product.quantity}
                                </h3>
                            </div>

                            {/* Quantity Selector */}
                            <div className='flex items-center justify-between gap-x-5 mt-3'>
                                <div className='text-sm font-light space-y-px dark:text-gray-300 text-gray-900'>
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
                                stock={product.quantity}
                                productId={product._id}
                                quantity={4}
                            />
                        </div>
                    </div>

                </section>
            </Layout>
        </main>
    )
}

export default ProductMain