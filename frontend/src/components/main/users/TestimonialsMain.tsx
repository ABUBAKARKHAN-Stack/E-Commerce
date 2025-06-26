import { Layout } from '@/components/layout/shared'
import { SectionHeader } from '@/components/reusable/user'
import { Testimonials } from '@/components/sections/user'

const TestimonialsMain = () => {
    return (
        <main
            className='w-full h-auto py-10 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]  
            backdrop-blur-xl border-b-2
    '>
            <Layout>
                <SectionHeader
                    mainHeading="What Our Customers Say"
                    subText="Real feedback from real people — see why shoppers love ShopNex!"
                />

                <section className='mt-10 w-full'>
                    <Testimonials />
                </section>
            </Layout>
        </main>
    )
}

export default TestimonialsMain