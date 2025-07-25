import { CategoryBadge, DeliveryInfo } from '@/components/reusable/user';
import { Separator } from '@/components/ui/separator';
import useFormattedDateTime from '@/hooks/useFormattedDateTime';
import { Receipt } from 'lucide-react';
import React, { FC, Ref } from 'react'

type Props = {
    receiptRef: Ref<HTMLDivElement>;
    products: any[];
    totalAmount: number;
    confirmedAt: Date
}

const CheckoutOrderReceipt: FC<Props> = ({
    receiptRef,
    products,
    totalAmount,
    confirmedAt
}) => {

    const formattedDate = new Date(confirmedAt);
    const etaDate = new Date(formattedDate.getTime() + 2 * 24 * 60 * 60 * 1000);
    return (
        <div
            ref={receiptRef}
            className="w-full rounded-2xl shadow-lg shadow-black transition-all duration-500"
        >
            {/*  Receipt Header */}
            <div className="bg-gradient-to-r rounded-t-2xl from-cyan-500 to-cyan-600 dark:from-orange-500 dark:to-orange-600 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Receipt className="w-6 h-6" />
                    Order Receipt
                </h2>
                <p className="dark:text-orange-100 text-cyan-50 mt-2">A detailed summary of your purchase is provided below.</p>
            </div>

            {/* Receipt Content  */}
            <div className="p-6 space-y-6">
                {products.map(({ orderedProductQuantity, name, price, }: any, i: number) => (
                    <div key={i} className="space-y-3">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold line-clamp-1 text-base uppercase">{name}</h3>
                            <h3 className="dark:text-orange-500 text-cyan-500 font-bold text-xl">
                                {orderedProductQuantity} X {price}$ = {orderedProductQuantity * price}$
                            </h3>
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
                        <h2 className="text-2xl font-semibold">Total</h2>
                        <h2 className="text-2xl font-bold">
                            ${Number(totalAmount).toFixed(2)}
                        </h2>
                    </div>
                </div>

                {/* Estimated Delivery Box */}
                <DeliveryInfo
                    formattedDate={formattedDate}
                    etaDate={etaDate}
                />

            </div>



        </div>
    )
}

export default CheckoutOrderReceipt