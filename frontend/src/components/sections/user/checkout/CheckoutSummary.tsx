import { CategoryBadge } from '@/components/reusable/user'
import { Separator } from '@/components/ui/separator'
import { ReceiptText } from 'lucide-react'
import { FC } from 'react'

type Props = {
    products: any;
    totalAmount: number
}

const CheckSummary: FC<Props> = ({
    products,
    totalAmount
}) => {

    return (

        <div className="xl:w-[calc(100%-125px)] w-full sticky top-0">
            <div className="rounded-2xl shadow-xl shadow-black">
                {/* Header */}
                <div className="bg-gradient-to-r rounded-t-2xl from-cyan-500 to-cyan-600 dark:from-orange-500 dark:to-orange-600 p-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <ReceiptText className="w-6 h-6" />
                        Order Summary
                    </h2>
                    <p className="dark:text-orange-100 text-cyan-50 mt-2">Review your items and confirm your purchase</p>
                </div>
                <div className="p-6 space-y-6">
                    {products.map(({ orderedProductQuantity, name, thumbnail, price, category }: any, i: number) => (
                        <div key={i} className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-x-3">
                                    <div className="size-22 rounded-lg dark:bg-orange-50 bg-cyan-50 relative p-1 transition-[color,box-shadow]">
                                        <img
                                            src={thumbnail}
                                            className="object-contain size-full drop-shadow-2px shadow-black"
                                        />
                                        <div className="absolute top-0 -translate-y-1/2 -right-3 z-10 bg-cyan-500 text-cyan-100 dark:bg-orange-500 dark:text-orange-200 flex justify-center items-center h-5 min-w-5 px-1.5 text-xs font-semibold rounded-full">
                                            {orderedProductQuantity}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <CategoryBadge category={category} className="static w-fit" />
                                        <h3 className="font-semibold max-w-40 line-clamp-1 text-sm uppercase">{name}</h3>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="dark:text-orange-500 text-cyan-500 font-bold text-3xl">{price}$</h1>
                                </div>
                            </div>
                            {i < products.length - 1 && <Separator />}
                        </div>
                    ))}

                    <Separator className='border dark:border-orange-500 border-cyan-500' />
                    <div className="space-y-3">
                        {/* Estimated Subtotal */}
                        <div className="flex justify-between items-center text-gray-900 dark:text-gray-300">
                            <h2 className="text-lg font-medium">Items Total</h2>
                            <h2 className="text-lg font-semibold">
                                ${Number(totalAmount - 50).toFixed(2)}
                            </h2>
                        </div>

                        {/* Shipping Fee */}
                        <div className="flex justify-between items-center text-gray-900 dark:text-gray-300">
                            <h2 className="text-lg font-medium">Shipping Fee</h2>
                            <h2 className="text-lg font-semibold">$50.00</h2>
                        </div>

                        <Separator />

                        {/* Final Total */}
                        <div className="flex justify-between items-center pt-2">
                            <h2 className="text-2xl font-semibold">Total Payment</h2>
                            <h2 className="text-2xl font-bold">
                                ${Number(totalAmount).toFixed(2)}
                            </h2>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CheckSummary