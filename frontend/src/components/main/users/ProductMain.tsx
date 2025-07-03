import { Layout } from '@/components/layout/shared'
import { SectionHeader, WaveDivider } from '@/components/reusable/user'
import { SearchFilterSortProduct } from '@/components/sections/user';
import { useProductContext } from '@/context/productContext'
import { ProductCard } from '@/components/reusable/user';
import { BlurFade } from '@/components/magicui/blur-fade';
import { useState } from 'react';
import { Pagination } from '@/components/reusable/shared';

const ProductMain = () => {
    const { productsData, totalProducts } = useProductContext();
    const [limit, setLimit] = useState(4);
    const [page, setPage] = useState(1);



    if (productsData === null) {
        return (
            <div className='w-full h-[70vh] text-7xl border-b-2 font-bold flex justify-center items-center'>Products Not Found</div>
        )
    }

    return (
        <main
            className='min-w-screen w-full overflow-x-hidden  h-full py-10 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]  
            backdrop-blur-xl relative border-b-2
    '>
            <Layout>
                <BlurFade
                    delay={0.1}
                    duration={1}
                    className='relative w-full'
                >
                    <SectionHeader
                        animateOnce
                        mainHeading="Our Products"
                        subText="Explore our wide range of products crafted to meet your needs. Use the filters below to find exactly what you're looking for."
                    />
                    <WaveDivider
                        position='bottom'
                        svgClass='h-2'
                        className='-z-10'
                    />
                </BlurFade>
                <section className='mt-10 relative z-50 w-full'>
                    {/* <BlurFade
                        inView
                        direction='down'
                        delay={0.75}
                    > */}
                    <SearchFilterSortProduct
                        page={page}
                        setPage={setPage}
                        limit={limit}
                        setLimit={setLimit}
                    />
                    {/* </BlurFade> */}

                    <div
                        className='grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-6 gap-y-10 mt-6'>
                        {productsData?.map((p, i) => (
                            <BlurFade
                                key={p._id}
                                inView
                                direction='right'
                                delay={0.25 + i * 0.05}
                            >
                                <ProductCard
                                    forHome={false}
                                    product={p}
                                />
                            </BlurFade>
                        ))}
                    </div>

                    <Pagination
                        limit={limit}
                        page={page}
                        setPage={setPage}
                        totalProducts={totalProducts}
                    />
                </section>
            </Layout>
        </main>

    )
}

export default ProductMain