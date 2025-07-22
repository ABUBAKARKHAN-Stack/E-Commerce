import { Layout } from '@/components/layout/shared'
import { BlurFade } from '@/components/magicui/blur-fade'
import { ShoppingBag, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
    return (
        <main
            className='min-w-screen w-full min-h-[75vh] overflow-x-hidden h-full py-10 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F] backdrop-blur-xl relative border-b-2
            '>
            <Layout className='flex flex-col justify-center items-center   space-y-6'>
                <BlurFade
                    inView
                    delay={0.1}
                    duration={0.25}
                    direction='down'

                >
                    <div className='relative'>
                        <div className='w-20 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow border-3 -z-10 shadow-md shadow-cyan-500/40 dark:shadow-orange-400/40 bg-white/10 dark:bg-white/10 '></div>
                        <div className='w-20 z-10 h-20 rounded-full dark:bg-orange-500 bg-cyan-500 flex justify-center items-center border border-cyan-200/40 dark:border-orange-400/50 '>
                            <ShoppingBag
                                className='size-10 dark:text-orange-200 text-cyan-100 drop-shadow-md'
                            />
                        </div>
                    </div>
                </BlurFade>


                <BlurFade
                    inView
                    delay={0.35}
                    direction='down'
                >
                    <div className='text-center space-y-4 mx-auto px-4'>
                        <h1 className='text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-orange-500 dark:to-orange-600 bg-clip-text text-transparent leading-tight tracking-tight'>
                            Your Cart is Empty
                        </h1>
                        <p className='text-lg md:text-xl text-gray-900 dark:text-gray-300 w-full sm:w-3/4 mx-auto leading-relaxed font-medium'>
                            It looks like you haven’t added anything to your cart yet. Start shopping to see your items here!
                        </p>
                        <p className='text-sm text-muted-foreground font-light'>
                            Explore our collection and add products to your cart to get started.
                        </p>
                    </div>
                </BlurFade>

                <BlurFade
                    inView
                    delay={0.75}
                    direction='down'                >
                    <Link to={'/products'} className='px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-orange-500 dark:to-orange-600 hover:from-cyan-600 hover:to-cyan-700 dark:hover:from-orange-600 dark:hover:to-orange-700 text-white font-semibold text-lg shadow-lg shadow-cyan-500/30 dark:shadow-orange-500/30 hover:shadow-xl hover:shadow-cyan-500/40 dark:hover:shadow-orange-500/40 transform hover:scale-[1.02] transition-all duration-300 border-0 flex items-center gap-3'>
                        <ShoppingCart className='size-7' />
                        Start Shopping
                    </Link>
                </BlurFade>
            </Layout>
        </main>
    )
}

export default EmptyCart