import { Layout } from '@/components/layout/shared'
import { SectionHeader } from '@/components/reusable/user'
import { SearchFilterSortProduct } from '@/components/sections/user';
import { useProductContext } from '@/context/productContext'
import { ProductCard } from '@/components/reusable/user';
import { Separator } from '@/components/ui/separator';

const ProductMain = () => {
    const { productsData } = useProductContext();
    console.log(productsData);


    return (
        <main
            className='w-full h-auto py-10 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]  
            backdrop-blur-xl border-b-2
    '>
            <Layout>
                <SectionHeader
                    animateOnce
                    mainHeading="Our Products"
                    subText="Explore our wide range of products crafted to meet your needs."
                />
                <section className='mt-10 w-full'>
                    <SearchFilterSortProduct
                    />
                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 mt-5'>
                        {productsData?.map((p) => {
                            console.log(p);
                            return (
                                <ProductCard
                                    key={p._id}
                                    forHome={false}
                                    product={p}
                                />
                            )
                        })}
                    </div>
                </section>
            </Layout>
        </main>
    )
}

export default ProductMain