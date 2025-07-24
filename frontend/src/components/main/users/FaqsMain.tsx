import { Layout } from '@/components/layout/shared'
import { SectionHeader } from '@/components/reusable/user'
import { commonFaqs, detailedFaqs } from '@/data/faqs';
import { BlurFade } from '@/components/magicui/blur-fade';
import { FaqsCard } from '@/components/sections/user/faqs';
import { FC, useState } from 'react';

type Props = {
    fullFaqs: boolean
}

const FaqsMain: FC<Props> = ({
    fullFaqs
}) => {
    const [showFaq, setShowFaq] = useState<{ id: number | null; isFaqOpen: boolean }>({
        id: null,
        isFaqOpen: false
    });

    return (
        <main
            className='why-choose-us w-full h-auto py-10 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]  
            backdrop-blur-xl border-b-2
    '>
            <Layout>
                <SectionHeader
                    mainHeading="Frequently Asked Questions"
                    subText="Find answers to common questions about orders, delivery, payments, and more. We've got you covered!"
                />

                <section className="w-full mt-10">
                    <BlurFade
                        inView
                        direction="right"
                        delay={0.75}
                        className="space-y-4"
                    >
                        {(fullFaqs ? detailedFaqs : commonFaqs).map(({ answer, question, id }, i) => (
                            <FaqsCard
                                id={id}
                                i={i}
                                question={question}
                                answer={answer}
                                setShowFaq={setShowFaq}
                                showFaq={showFaq}
                            />
                        ))}
                    </BlurFade>

                </section>

            </Layout>
        </main>
    )
}

export default FaqsMain