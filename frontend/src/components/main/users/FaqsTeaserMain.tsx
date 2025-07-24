import { Layout } from '@/components/layout/shared'
import { BlurFade } from '@/components/magicui/blur-fade'
import { SectionHeader } from '@/components/reusable/user'
import { FaqTeaser } from '@/components/sections/user/faqs'

const FaqsTeaserMain = () => {
    return (
        <main
            className='why-choose-us w-full h-auto py-10 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]  
            backdrop-blur-xl border-b-2
    '>
            <Layout>
                <SectionHeader
                    mainHeading="Still Have Questions?"
                    subText="You might find your answer in our Frequently Asked Questions section."
                />
                <section className='mt-10 w-full'>
                    <BlurFade
                        delay={0.25 * 3}
                        direction='down'
                        inView
                        once={false}
                    >
                        <FaqTeaser />
                    </BlurFade>
                </section>

            </Layout>
        </main>
    )
}

export default FaqsTeaserMain