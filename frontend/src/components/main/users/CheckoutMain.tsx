import { Layout } from '@/components/layout/shared';
import { BlurFade } from '@/components/magicui/blur-fade';
import { SectionHeader } from '@/components/reusable/user';
import { CheckoutForm, CheckSummary } from '@/components/sections/user/checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLoaderData } from 'react-router-dom'


const CheckoutMain = () => {
    const { totalAmount, products } = useLoaderData();
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);



    return (
        <main
            className='min-w-screen w-full overflow-x-hidden h-full py-10 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]  
            backdrop-blur-xl relative border-b-2'>
            <Layout>
                <SectionHeader
                    animateOnce
                    mainHeading="Secure Checkout"
                    subText="Review your details and finalize your purchase with confidence."
                />
                <section className='mt-10'>
                    <BlurFade
                    delay={0.25 * 3}
                    direction='down'
                    className='flex xl:flex-row flex-col items-start gap-8 justify-between w-full '>
                        {/* Checkout Form Section */}
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                totalAmount={totalAmount}
                            />
                        </Elements>

                        {/* Checkout Summary Section */}
                        <CheckSummary
                            products={products}
                            totalAmount={totalAmount}
                        />
                    </BlurFade>
                </section>
            </Layout>

        </main>
    )
}

export default CheckoutMain



