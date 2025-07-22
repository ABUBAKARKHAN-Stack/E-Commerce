import { FC, Ref } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
    buttonsRef: Ref<HTMLDivElement>;
    orderId:string
}

const CheckoutSuccessActionButtons: FC<Props> = ({
    buttonsRef,
    orderId
}) => {
    const navigate = useNavigate();
    return (
        <div
            ref={buttonsRef}
            className="flex flex-wrap gap-4 justify-center">
            <button
                onClick={() => navigate(`/track-order?orderId=${orderId}`)}
                className='px-12 py-3 hover:cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-orange-500 dark:to-orange-600 hover:from-cyan-600 hover:to-cyan-700 dark:hover:from-orange-600 dark:hover:to-orange-700 text-white font-semibold text-lg shadow-lg shadow-cyan-500/30 dark:shadow-orange-500/30 hover:shadow-xl hover:shadow-cyan-500/40 dark:hover:shadow-orange-500/40 transform hover:scale-[1.02] transition-all duration-300 border-0 flex items-center gap-3'>
                Track Order
            </button>
            <button
                onClick={() => navigate('/products')}
                className='px-12 py-3 hover:cursor-pointer rounded-xl bg-white dark:bg-transparent border-2 text-black dark:text-white font-semibold text-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center gap-3'>
                Continue Shopping
            </button>
        </div>
    )
}

export default CheckoutSuccessActionButtons