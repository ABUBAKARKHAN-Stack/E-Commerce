import { Layout } from '@/components/layout/shared'
import { SectionHeader } from '@/components/reusable/user'
import { TrendingProductsCard } from '@/components/sections/user'

const TrendingProductsMain = () => {
    return (
        <main
            className='min-w-screen w-full h-auto py-10  bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]  
            backdrop-blur-xl border-b-2
    '>
            <Layout>
                <SectionHeader
                    mainHeading="Trending Products"
                    subText="Browse our most popular picks — handpicked for quality, performance, and unbeatable value."
                />

                {/* Trending Products Cards */}
                <section className='mt-10 w-full flex flex-row flex-nowrap items-center overflow-x-auto lg:grid lg:grid-cols-5 lg:place-items-center gap-2'>
                    <TrendingProductsCard />
                </section>
            </Layout>
        </main>
    )
}

export default TrendingProductsMain