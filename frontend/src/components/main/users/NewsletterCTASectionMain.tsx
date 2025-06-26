import { Layout } from '@/components/layout/shared'
import { SectionHeader } from '@/components/reusable/user'
import { NewsletterCTASection } from '@/components/sections/user'

const NewsletterCTASectionMain = () => {
    return (
        <main
            className='w-full h-auto py-10 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]  
            backdrop-blur-xl border-b-2
    '>
            <Layout>
                <SectionHeader
                    mainHeading="Stay Ahead & Save Big"
                    subText="Subscribe for exclusive deals or jump right in and explore our latest tech drops."
                />
                <section className='mt-10'>
                    <NewsletterCTASection />
                </section>

            </Layout>

        </main>
    )
}

export default NewsletterCTASectionMain