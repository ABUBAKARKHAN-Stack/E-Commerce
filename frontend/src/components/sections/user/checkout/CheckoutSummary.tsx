import { CategoryBadge } from "@/components/reusable/user";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckoutTabsType, ShippingMethod } from "@/types/main.types";
import { handleScrollToSection } from "@/utils/HandleScrollToSection";
import { ReceiptText } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  products: any;
  totalAmount: number;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<CheckoutTabsType>>;
  shippingMethod: string;
};

const CheckSummary: FC<Props> = ({
  products,
  totalAmount,
  activeTab,
  setActiveTab,
  shippingMethod,
}) => {
  return activeTab === "checkout-summary" ? (
    <div className="w-full">
      <div className="rounded-2xl shadow-xl shadow-black">
        {/* Header */}
        <div className="rounded-t-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 dark:from-orange-500 dark:to-orange-600">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
            <ReceiptText className="h-6 w-6" />
            Order Summary
          </h2>
          <p className="mt-2 text-cyan-50 dark:text-orange-100">
            Review your items and confirm your purchase
          </p>
        </div>
        <div className="space-y-6 p-6">
          {products.map(
            (
              { orderedProductQuantity, name, thumbnail, price, category }: any,
              i: number,
            ) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-3">
                    <div className="relative size-22 rounded-lg bg-cyan-50 p-1 transition-[color,box-shadow] dark:bg-orange-50">
                      <img
                        src={thumbnail}
                        className="drop-shadow-2px size-full object-contain shadow-black"
                      />
                      <div className="absolute top-0 -right-3 z-10 flex h-5 min-w-5 -translate-y-1/2 items-center justify-center rounded-full bg-cyan-500 px-1.5 text-xs font-semibold text-cyan-100 dark:bg-orange-500 dark:text-orange-200">
                        {orderedProductQuantity}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <CategoryBadge
                        category={category}
                        className="static w-fit"
                      />
                      <h3 className="line-clamp-1 max-w-40 text-sm font-semibold uppercase">
                        {name}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-cyan-500 dark:text-orange-500">
                      {price}$
                    </h1>
                  </div>
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
                ${Number(totalAmount).toFixed(2)}
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
              <h2 className="text-2xl font-semibold">Total Payment</h2>
              <h2 className="text-2xl font-bold">
                ${Number(totalAmount).toFixed(2)}
              </h2>
            </div>
          </div>

          <Button
            size={"lg"}
            onClick={() => {
              setActiveTab("payment");
              handleScrollToSection("payment-section");
            }}
          >
            Continue To Payment
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CheckSummary;
