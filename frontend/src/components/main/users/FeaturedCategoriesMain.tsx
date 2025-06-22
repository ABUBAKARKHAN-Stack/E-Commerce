import { Layout } from '@/components/layout/shared'
import { SectionHeader } from '@/components/reusable/user'
import { FeaturedCategoriesCard } from '@/components/sections/user'
import React from 'react'

const FeaturedCategoriesMain = () => {
    return (
        <main
            className='w-full h-auto py-10 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]  
            backdrop-blur-xl border-b-2
    '>
            <Layout>
                <SectionHeader
                    mainHeading='Explore Our Top Categories'
                    subText='Find the perfect gadget faster — browse by category and explore what fits your needs.'
                />

                {/* Featured Categories Cards */}
                <section className='grid mt-10 w-full grid-cols-1 xxs:grid-cols-2 xsm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 place-items-center gap-y-4'>
                    <FeaturedCategoriesCard />
                </section>
            </Layout>
        </main>
    )
}

export default FeaturedCategoriesMain