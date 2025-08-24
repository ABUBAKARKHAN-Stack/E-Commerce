import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import QuantitySelectorSkeleton from "./QuantitySelectorSkeleton";

interface Props {}

const CartCardSkeleton: FC<Props> = () => {
  return (
    <div className="border-border bg-background flex w-full flex-col gap-4 border-b px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Desktop Layout ( > lg) */}
      <div className="hidden lg:flex lg:w-full lg:items-center lg:justify-between lg:gap-6">
        {/* Category Badge */}
        <Skeleton className="h-6 w-20 rounded-full" />

        {/* Product Thumbnail */}
        <div className="aspect-square size-24 md:size-28">
          <Skeleton className="size-full" />
        </div>

        {/* Product Name */}
        <div className="w-full max-w-[150px]">
          <Skeleton className="h-4 w-full" />
        </div>

        {/* Subtotal Section */}
        <div className="space-y-1 text-center">
          <Skeleton className="mx-auto h-8 w-16" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mx-auto h-3 w-20" />
        </div>

        <div className="w-full max-w-40">
          <QuantitySelectorSkeleton />
        </div>

        {/* Remove Button */}
        <Skeleton className="h-9 w-20" />
      </div>

      {/* Mobile Layout (< lg) */}
      <div className="space-y-4 lg:hidden">
        {/* Category Badge - Top Right */}
        <div className="flex justify-end">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Product Image and Name Row */}
        <div className="flex items-start gap-4">
          <div className="aspect-square size-24 flex-shrink-0">
            <Skeleton className="size-full" />
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 max-w-40" />
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mx-auto w-full max-w-40">
          <QuantitySelectorSkeleton />
        </div>

        {/* Price and Remove Button Row */}
        <div className="flex items-center justify-between">
          <div className="space-y-1 text-left">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
};

export default CartCardSkeleton;
