import { DeliveryInfo, OrderStatusBadge } from "@/components/reusable/user";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ReceiptText } from "lucide-react";
import { FC } from "react";

type Props = {
  order: any;
};

const TrackOrderReceipt: FC<Props> = ({ order }) => {
  const {
    orderId,
    products,
    totalAmount,
    confirmedAt,
    orderStatus,
    deliveryDate,
    shipping
  } = order;


  const subTotal = totalAmount - shipping;

  return (
    <div className="w-full rounded-2xl shadow-lg shadow-black transition-all duration-500">
      {/* Receipt Header */}
      <div className="rounded-t-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 dark:from-orange-500 dark:to-orange-600">
        <h2 className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-white">
          <ReceiptText className="h-6 w-6" />
          <span>Order Tracking Receipt</span>
        </h2>
        <p className="mt-2 text-base leading-relaxed text-cyan-50 dark:text-orange-100">
          You're viewing a detailed summary of your tracked order. Stay informed
          about your purchase, shipping status, and expected delivery.
        </p>
      </div>
      <div className="space-y-6 p-6">
        {/* Order ID and Status */}
        <div className="flex items-center justify-between">
          <h3 className="text-muted-foreground text-lg font-semibold">
            Order:{" "}
            <span className="text-black dark:text-white">#{orderId}</span>
          </h3>
          <OrderStatusBadge
            orderStatus={orderStatus}
          />
        </div>

        <Separator />

        {/* Product Summary */}
        {products.map(
          ({ name, orderedProductQuantity, price }: any, i: number) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="line-clamp-1 text-base font-semibold uppercase">
                  {name}
                </h3>
                <h3 className="text-xl font-bold text-cyan-500 dark:text-orange-500">
                  {orderedProductQuantity} x ${price} = $
                  {orderedProductQuantity * price}
                </h3>
              </div>
              {i < products.length - 1 && <Separator />}
            </div>
          ),
        )}

        <Separator className="border border-cyan-500 dark:border-orange-500" />

        {/* Pricing Summary */}
        <div className="space-y-3">
          <div className="flex justify-between text-gray-900 dark:text-gray-300">
            <span className="text-lg font-medium">Items Total</span>
            <span className="text-lg font-semibold">
              ${subTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-gray-900 dark:text-gray-300">
            <span className="text-lg font-medium">Shipping Fee</span>
            <span className="text-lg font-semibold">${shipping}</span>
          </div>
          <Separator />
          <div className="flex justify-between pt-2">
            <h2 className="text-2xl font-semibold">Total</h2>
            <h2 className="text-2xl font-bold">${totalAmount.toFixed(2)}</h2>
          </div>
        </div>

        {/* Delivery Info */}
        <DeliveryInfo confirmedAt={confirmedAt} deliveryDate={deliveryDate} />
      </div>
    </div>
  );
};

export default TrackOrderReceipt;
