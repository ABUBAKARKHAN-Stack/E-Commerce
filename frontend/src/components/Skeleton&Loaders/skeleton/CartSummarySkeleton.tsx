import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {}

const CartSummarySkeleton: FC<Props> = () => {
  return (
    <div className="from-background/90 dark:to-background/70 shadow-10px flex w-full flex-col space-y-8 rounded-2xl border-2 bg-gradient-to-br p-8 shadow-black/10 backdrop-blur-sm dark:shadow-black/40">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-1 w-20 rounded-full" />
      </div>

      {/* Summary Items */}
      <div className="space-y-5">
        {/* Summary Items Row for lg+ screens */}
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* Carted Products */}
          <div className="flex items-center justify-between rounded-xl border p-4 lg:flex-1">
            <div className="flex items-center gap-3">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="rounded-full px-3 py-1">
              <Skeleton className="h-5 w-8" />
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex items-center justify-between rounded-xl border p-4 lg:flex-1">
            <div className="flex items-center gap-3">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white px-4 dark:bg-[#18181b]">
              <Skeleton className="h-2 w-2 rounded-full" />
            </div>
          </div>
        </div>

        {/* Estimated Total */}
        <div className="flex items-center justify-between rounded-xl border-2 p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-6 w-36" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="pt-4">
        <Skeleton className="h-12 w-56 rounded-xl shadow-lg" />
      </div>
    </div>
  );
};

export default CartSummarySkeleton;
