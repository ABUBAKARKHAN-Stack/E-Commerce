import { DeliveryInfo } from "@/components/reusable/user";
import { Separator } from "@/components/ui/separator";
import { ShippingMethod } from "@/types/main.types";
import { Receipt } from "lucide-react";
import { FC, Ref } from "react";

type Props = {
  receiptRef: Ref<HTMLDivElement>;
  products: any[];
  totalAmount: number;
  confirmedAt: Date;
  shippingMethod: string;
  shipping: number;
};

const CheckoutOrderReceipt: FC<Props> = ({
  receiptRef,
  products,
  totalAmount,
  confirmedAt,
  shippingMethod,
  shipping,
}) => {
  const formattedDate = new Date(confirmedAt);
  const etaDate = new Date(formattedDate.getTime() + 2 * 24 * 60 * 60 * 1000);
  return (
    <div
      ref={receiptRef}
      className="w-full rounded-2xl shadow-lg shadow-black transition-all duration-500"
    >
      {/*  Receipt Header */}
      <div className="rounded-t-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 dark:from-orange-500 dark:to-orange-600">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
          <Receipt className="h-6 w-6" />
          Order Receipt
        </h2>
        <p className="mt-2 text-cyan-50 dark:text-orange-100">
          A detailed summary of your purchase is provided below.
        </p>
      </div>

      {/* Receipt Content  */}
      <div className="space-y-6 p-6">
        {products.map(
          ({ orderedProductQuantity, name, price }: any, i: number) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="line-clamp-1 text-base font-semibold uppercase">
                  {name}
                </h3>
                <h3 className="text-xl font-bold text-cyan-500 dark:text-orange-500">
                  {orderedProductQuantity} X {price}$ ={" "}
                  {orderedProductQuantity * price}$
                </h3>
              </div>
              {i < products.length - 1 && <Separator />}
            </div>
          ),
        )}

        <Separator className="border border-cyan-500 dark:border-orange-500" />
        <div className="space-y-3">
          {/* Estimated Subtotal */}
          <div className="flex items-center justify-between text-gray-900 dark:text-gray-300">
            <h2 className="text-lg font-medium">Items Total</h2>
            <h2 className="text-lg font-semibold">
              ${Number(totalAmount - shipping).toFixed(2)}
            </h2>
          </div>

          {/* Shipping Fee */}
          <div className="flex items-center justify-between text-gray-900 dark:text-gray-300">
            <h2 className="text-lg font-medium">Shipping Fee</h2>
            <h2 className="text-lg font-semibold">
              {shippingMethod === ShippingMethod.EXPRESS
                ? "$9.99"
                : shippingMethod === ShippingMethod.STANDARD
                  ? "$6.99"
                  : "$0"}
            </h2>
          </div>

          <Separator />

          {/* Final Total */}
          <div className="flex items-center justify-between pt-2">
            <h2 className="text-2xl font-semibold">Total</h2>
            <h2 className="text-2xl font-bold">
              ${Number(totalAmount).toFixed(2)}
            </h2>
          </div>
        </div>

        {/* Estimated Delivery Box */}
        <DeliveryInfo formattedDate={formattedDate} etaDate={etaDate} />
      </div>
    </div>
  );
};

export default CheckoutOrderReceipt;
