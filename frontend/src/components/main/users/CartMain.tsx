import { Layout } from '@/components/layout/shared';
import { BlurFade } from '@/components/magicui/blur-fade';
import { SectionHeader } from '@/components/reusable/user';
import { CartCard, CartSummary, EmptyCart } from '@/components/sections/user/cart'
import { useLoaderData } from 'react-router-dom';

const CartMain = () => {
    const { productsFromCart, totalAmount } = useLoaderData();

    if (!productsFromCart) {
        return <EmptyCart />
    }


    return (
        <main
            className='min-w-screen w-full overflow-x-hidden h-full py-10 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]  
            backdrop-blur-xl relative border-b-2
    '>
            <Layout>
                <SectionHeader
                    animateOnce
                    mainHeading="Your Cart"
                    subText="Review your selected items and proceed to checkout."
                />
                <section className='mt-10 w-full'>
                    <BlurFade
                        inView
                        direction="down"
                        delay={0.25 * 3}
                        className='relative z-10'
                    >
                        <CartCard
                            products={productsFromCart}
                        />
                    </BlurFade>
                </section>
                <section className='mt-8 w-full'>
                    <BlurFade
                        inView
                        direction="down"
                        delay={0.25 * 4}
                        className='relative z-10'
                    >
                        <CartSummary
                            totalAmount={totalAmount}
                            totalProducts={productsFromCart.length}
                        />
                    </BlurFade>
                </section>
            </Layout>
        </main>
    )
}

export default CartMain