import { proceedToCheckout } from "@/API/userApi";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useProductContext } from "@/context/productContext";
import { CheckCircle, CheckCircle2, Lock } from "lucide-react";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  totalAmount: number;
  totalProducts: number;
};

const CartSummary: FC<Props> = ({ totalAmount, totalProducts }) => {
  const { proceedToCheckout } = useProductContext();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    proceedToCheckout(navigate);
  };

  return (
    <div className="from-background/90 dark:to-background/70 shadow-10px flex w-full flex-col space-y-8 rounded-2xl border-2 bg-gradient-to-br p-8 shadow-black/10 backdrop-blur-sm dark:shadow-black/40">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-start text-3xl font-bold text-transparent dark:from-orange-500 dark:to-orange-600">
          Cart Summary
        </h1>
        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-orange-500 dark:to-orange-600"></div>
      </div>

      {/* Summary Items */}
      <div className="space-y-5">
        {/* Summary Items Row for lg+ screens */}
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* Carted Products */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200/60 bg-white/80 p-4 transition-all duration-200 hover:bg-white/90 lg:flex-1 dark:border-orange-400/20 dark:bg-orange-900/10 dark:hover:bg-orange-900/20">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-cyan-500 dark:bg-orange-400"></div>
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Carted Products
              </h2>
            </div>
            <div className="rounded-full bg-cyan-100 px-3 py-1 dark:bg-orange-900/30">
              <h2 className="text-lg font-bold text-cyan-700 dark:text-orange-300">
                {totalProducts}
              </h2>
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200/60 bg-white/80 p-4 transition-all duration-200 hover:bg-white/90 lg:flex-1 dark:border-orange-400/20 dark:bg-orange-900/10 dark:hover:bg-orange-900/20">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-cyan-500 dark:bg-orange-400"></div>
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Subtotal
              </h2>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-orange-200">
              ${totalAmount.toFixed(2)}
            </h2>
          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white px-4 dark:bg-[#18181b]">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-orange-400 dark:to-orange-500"></div>
            </div>
          </div>
        </div>

        {/* Estimated Total */}
        <div className="flex items-center justify-between rounded-xl border-2 border-cyan-200/50 bg-gradient-to-r from-cyan-50 to-cyan-100 p-6 shadow-lg shadow-cyan-500/10 dark:border-orange-400/30 dark:from-orange-900/20 dark:to-orange-800/20 dark:shadow-orange-500/10">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-orange-400 dark:to-orange-500"></div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Estimated Total
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-3xl font-black text-transparent dark:from-orange-400 dark:to-orange-500">
              ${Number(totalAmount).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="pt-4">
        <Button
          onClick={handleProceedToCheckout}
          className="w-fit transform rounded-xl border-0 bg-gradient-to-r from-cyan-500 to-cyan-600 py-6 text-lg font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02] hover:from-cyan-600 hover:to-cyan-700 hover:shadow-xl hover:shadow-cyan-500/40 dark:from-orange-500 dark:to-orange-600 dark:shadow-orange-500/30 dark:hover:from-orange-600 dark:hover:to-orange-700 dark:hover:shadow-orange-500/40"
        >
          <div className="flex items-center justify-center gap-3">
            <CheckCircle2 className="size-5" />
            Proceed To Checkout
          </div>
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
