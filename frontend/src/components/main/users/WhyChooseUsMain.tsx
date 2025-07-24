import React from 'react'
import { WhyChooseUs } from '@/components/sections/user'
import { Layout } from '@/components/layout/shared'
import { SectionHeader } from '@/components/reusable/user'

const WhyChooseUsMain = () => {
    return (
        <main
            className='why-choose-us w-full h-auto py-10 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]  
            backdrop-blur-xl border-b-2
    '>
            <Layout>
                <SectionHeader
                    mainHeading="Why Choose ShopNex?"
                    subText="We go beyond just selling tech — enjoy fast delivery, secure payments, and 24/7 support for a smooth shopping experience."
                />
                <section className='grid mt-10 grid-cols-1 md:grid-cols-3 relative w-full gap-y-5 md:gap-y-0 xl:gap-x-16 md:gap-x-8 gap-x-0 mx-auto'>
                    <WhyChooseUs />
                </section>
            </Layout>
        </main>
    )
}

export default WhyChooseUsMain