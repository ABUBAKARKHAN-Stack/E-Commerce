import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, CheckCircle2, Lock } from 'lucide-react';
import React, { FC } from 'react'

type Props = {
    totalAmount: number;
    totalProducts: number;
}

const CartSummary: FC<Props> = ({
    totalAmount,
    totalProducts
}) => {
    return (
        <div className='flex flex-col w-full p-8 border-2 rounded-2xl bg-gradient-to-br from-background/90 dark:to-background/70 backdrop-blur-sm shadow-10px shadow-black/10 dark:shadow-black/40 space-y-8'>
            {/* Header */}
            <div className='space-y-2'>
                <h1 className="text-3xl font-bold text-start bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-orange-500 dark:to-orange-600 bg-clip-text text-transparent">
                    Cart Summary
                </h1>
                <div className='h-1 w-20 bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-orange-500 dark:to-orange-600 rounded-full'></div>
            </div>

            {/* Summary Items */}
            <div className='space-y-5'>
                {/* Summary Items Row for lg+ screens */}
                <div className='flex flex-col lg:flex-row gap-5'>
                    {/* Carted Products */}
                    <div className='flex justify-between items-center p-4 rounded-xl bg-white/80 dark:bg-orange-900/10 border border-gray-200/60 dark:border-orange-400/20 hover:bg-white/90 dark:hover:bg-orange-900/20 transition-all duration-200 lg:flex-1'>
                        <div className='flex items-center gap-3'>
                            <div className='w-2 h-2 bg-cyan-500 dark:bg-orange-400 rounded-full'></div>
                            <h2 className='text-gray-700 dark:text-gray-300 text-lg font-medium'>Carted Products</h2>
                        </div>
                        <div className='px-3 py-1 bg-cyan-100 dark:bg-orange-900/30 rounded-full'>
                            <h2 className='text-cyan-700 dark:text-orange-300 font-bold text-lg'>{totalProducts}</h2>
                        </div>
                    </div>

                    {/* Subtotal */}
                    <div className='flex justify-between items-center p-4 rounded-xl bg-white/80 dark:bg-orange-900/10 border border-gray-200/60 dark:border-orange-400/20 hover:bg-white/90 dark:hover:bg-orange-900/20 transition-all duration-200 lg:flex-1'>
                        <div className='flex items-center gap-3'>
                            <div className='w-2 h-2 bg-cyan-500 dark:bg-orange-400 rounded-full'></div>
                            <h2 className='text-gray-700 dark:text-gray-300 text-lg font-medium'>Subtotal</h2>
                        </div>
                        <h2 className='text-gray-900 dark:text-orange-200 font-bold text-xl'>${totalAmount}</h2>
                    </div>

                    {/* Shipping */}
                    <div className='flex justify-between items-center p-4 rounded-xl bg-white/80 dark:bg-orange-900/10 border border-gray-200/60 dark:border-orange-400/20 hover:bg-white/90 dark:hover:bg-orange-900/20 transition-all duration-200 lg:flex-1'>
                        <div className='flex items-center gap-3'>
                            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                            <h2 className='text-gray-700 dark:text-gray-300 text-lg font-medium'>Shipping</h2>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-xs text-green-600 dark:text-green-400 font-medium bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full'>Standard</span>
                            <h2 className='text-gray-900 dark:text-orange-200 font-bold text-xl'>$50</h2>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-dashed border-gray-300 dark:border-gray-600'></div>
                    </div>
                    <div className='relative flex justify-center'>
                        <div className='bg-white dark:bg-[#18181b] px-4'>
                            <div className='w-2 h-2 bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-orange-400 dark:to-orange-500 rounded-full'></div>
                        </div>
                    </div>
                </div>

                {/* Estimated Total */}
                <div className='flex justify-between items-center p-6 rounded-xl bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-orange-900/20 dark:to-orange-800/20 border-2 border-cyan-200/50 dark:border-orange-400/30 shadow-lg shadow-cyan-500/10 dark:shadow-orange-500/10'>
                    <div className='flex items-center gap-3'>
                        <div className='w-3 h-3 bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-orange-400 dark:to-orange-500 rounded-full animate-pulse'></div>
                        <h2 className='text-gray-800 dark:text-gray-200 text-xl font-bold'>Estimated Total</h2>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-orange-400 dark:to-orange-500'>
                            ${totalAmount + 50}
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkout Button */}
            <div className='pt-4'>
                <Button className='text-lg font-semibold py-6 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-orange-500 dark:to-orange-600 hover:from-cyan-600 hover:to-cyan-700 dark:hover:from-orange-600 dark:hover:to-orange-700 text-white shadow-lg shadow-cyan-500/30 dark:shadow-orange-500/30 hover:shadow-xl hover:shadow-cyan-500/40 dark:hover:shadow-orange-500/40 transform hover:scale-[1.02] w-fit transition-all duration-300 border-0'>
                    <div className='flex items-center justify-center gap-3'>
                        <CheckCircle2 className='size-5' />
                        Proceed To Checkout
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default CartSummary