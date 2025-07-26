import { OrderIdBadge } from '@/components/reusable/user';
import { CheckCircle } from 'lucide-react'
import { FC, Ref } from 'react'

type Props = {
    checkIconRef: Ref<HTMLDivElement>;
    orderId: string
}
const CheckoutSuccessIconAndText: FC<Props> = ({
    checkIconRef,
    orderId
}) => {
    return (
        <div className="text-center">
            <div ref={checkIconRef} className="relative inline-flex items-center justify-center">
                <div className="size-28 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow shadow-[0px_6px_4px_-1px] shadow-cyan-500/40 dark:shadow-orange-400/40 bg-white/10"></div>
                <div className="size-28 rounded-full dark:bg-orange-500 bg-cyan-500 flex justify-center items-center border border-cyan-200/40 dark:border-orange-400/50 z-10">
                    <CheckCircle className="size-20 dark:text-orange-200 text-cyan-100 drop-shadow-md" />
                </div>
            </div>

            {/*  Order Confirmed Title */}
            <h1 className="success-title text-5xl font-bold mt-8 text-gray-900 dark:text-white tracking-tight">
                Order Confirmed!
            </h1>

            {/*  Subtitle */}
            <p className="success-subtitle text-lg mt-4 text-gray-900 dark:text-gray-300">
                Thank you for your purchase. Your order has been successfully placed.
                <br />
                <span className='text-sm font-medium inline-block text-muted-foreground'>A confirmation email with your order details has been sent to your inbox.</span>
            </p>


            {/*  Order ID badge */}
            <OrderIdBadge
                orderId={orderId}
            />
        </div>)
}

export default CheckoutSuccessIconAndText