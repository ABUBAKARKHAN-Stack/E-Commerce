import { DeliveryInfo } from "@/components/reusable/user";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useFormattedDateTime from "@/hooks/useFormattedDateTime";
import { ReceiptText } from "lucide-react";
import { FC } from "react";

type Props = {
    order: any
}

const TrackOrderReceipt: FC<Props> = ({ order }) => {
    const { orderId, products, totalAmount, confirmedAt, orderStatus } = order;

    const formattedDate = new Date(confirmedAt);
    const etaDate = new Date(formattedDate.getTime() + 2 * 24 * 60 * 60 * 1000);

    return (
        <div className="w-full rounded-2xl shadow-lg shadow-black transition-all duration-500">
            {/* Receipt Header */}
            <div className="bg-gradient-to-r rounded-t-2xl from-cyan-500 to-cyan-600 dark:from-orange-500 dark:to-orange-600 p-6">
                <h2 className="text-3xl font-semibold text-white tracking-tight flex items-center gap-3">
                    <ReceiptText className="w-6 h-6" />
                    <span>Order Tracking Receipt</span>
                </h2>
                <p className="mt-2 text-base leading-relaxed text-cyan-50 dark:text-orange-100">
                    You're viewing a detailed summary of your tracked order. Stay informed about your purchase, shipping status, and expected delivery.
                </p>
            </div>
            <div className="p-6 space-y-6">
                {/* Order ID and Status */}
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-muted-foreground">
                        Order ID: <span className="text-black dark:text-white">{orderId}</span>
                    </h3>
                    <Badge variant={orderStatus === "confirmed" ? "success" : "default"}>
                        {orderStatus}
                    </Badge>

                </div>

                <Separator />

                {/* Product Summary */}
                {products.map(({ name, orderedProductQuantity, price }: any, i: number) => (
                    <div key={i} className="space-y-3">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold line-clamp-1 text-base uppercase">{name}</h3>
                            <h3 className="dark:text-orange-500 text-cyan-500 font-bold text-xl">
                                {orderedProductQuantity} x ${price} = ${orderedProductQuantity * price}
                            </h3>
                        </div>
                        {i < products.length - 1 && <Separator />}
                    </div>
                ))}

                <Separator className='border dark:border-orange-500 border-cyan-500' />

                {/* Pricing Summary */}
                <div className="space-y-3">
                    <div className="flex justify-between text-gray-900 dark:text-gray-300">
                        <span className="text-lg font-medium">Items Total</span>
                        <span className="text-lg font-semibold">${(totalAmount - 50).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-900 dark:text-gray-300">
                        <span className="text-lg font-medium">Shipping Fee</span>
                        <span className="text-lg font-semibold">$50.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between pt-2">
                        <h2 className="text-2xl font-semibold">Total</h2>
                        <h2 className="text-2xl font-bold">${totalAmount.toFixed(2)}</h2>
                    </div>
                </div>

                {/* Delivery Info */}
                <DeliveryInfo
                    formattedDate={formattedDate}
                    etaDate={etaDate}
                />

            </div>

        </div>
    );
};

export default TrackOrderReceipt
