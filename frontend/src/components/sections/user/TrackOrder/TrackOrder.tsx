import { Layout } from '@/components/layout/shared'
import { SectionHeader } from '@/components/reusable/user'
import { useAuthContext } from '@/context/authContext'
import React from 'react'
import TrackOrderForm from './TrackOrderForm'
import { BlurFade } from '@/components/magicui/blur-fade'

const TrackOrder = () => {
    const { user } = useAuthContext()
    return (
        <main
            className='min-w-screen w-full overflow-x-hidden h-full py-10 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]  
            backdrop-blur-xl relative border-b-2
    '>
            <Layout>
                <SectionHeader
                    animateOnce
                    mainHeading="Track Your Order"
                    subText={`Hey ${user?.username}, stay updated with your order status and delivery progress.`}
                />
                <section className='w-full mt-10'>
                    <BlurFade
                        inView
                        direction="down"
                        delay={0.25 * 3}
                        className='relative z-10'
                    >
                        <TrackOrderForm />
                    </BlurFade>
                </section>
            </Layout>
        </main>
    )
}

export default TrackOrder