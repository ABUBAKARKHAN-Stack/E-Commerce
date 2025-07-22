import { Layout } from '@/components/layout/shared'
import { BlurFade } from '@/components/magicui/blur-fade'
import { SectionHeader } from '@/components/reusable/user'
import { TrackOrder, TrackOrderReceipt } from '@/components/sections/user/TrackOrder'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/authContext'
import { ArrowLeft, ArrowLeftCircle } from 'lucide-react'
import { useLoaderData, useNavigate } from 'react-router-dom'

const TrackOrderMain = () => {
    const { user } = useAuthContext();
    const orderData = useLoaderData();
    const navigate = useNavigate();

    if (!orderData) return <TrackOrder />;


    return (
        <main
            className='min-w-screen w-full overflow-x-hidden h-full py-10 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]  
            backdrop-blur-xl border-b-2
    '>

            <Layout className='relative'>
                <BlurFade className='absolute z-50' direction='right'>
                    <Button
                        onClick={() => navigate(-1)}
                        className='rounded-full md:flex hidden size-10 hover:scale-95 transition-all duration-300 hover:-translate-x-2'>
                        <ArrowLeft
                            className='size-7 dark:text-orange-200 text-cyan-100'
                        />
                    </Button>
                </BlurFade>
                <SectionHeader
                    animateOnce
                    mainHeading="Here's Your Order"
                    subText={`Hey ${user?.username}, here are the latest updates for your order. Track every step of your delivery journey.`}
                />

                <section className="mt-10 space-y-8 w-full">
                    <BlurFade
                        inView
                        direction="down"
                        delay={0.25 * 3}
                        className='relative z-10'
                    >
                        <TrackOrderReceipt
                            order={orderData}
                        />
                    </BlurFade>
                    <Button 
                    onClick={() => navigate(-1)}
                    className='md:hidden flex w-full'>
                       <ArrowLeftCircle />  Go Back
                    </Button>
                </section>
            </Layout>
        </main >
    )
}

export default TrackOrderMain