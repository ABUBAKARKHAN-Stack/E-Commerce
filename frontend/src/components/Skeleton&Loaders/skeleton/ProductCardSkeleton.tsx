import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

type Props = { forHome?: boolean };

const ProductCardSkeleton: FC<Props> = ({ forHome }) => {
  return (
    <div
      className={`${forHome ? "w-48 xl:w-50" : "min-h-96 w-full"} bg-background rounded-t shadow-md`}
    >
      {/* Top image area */}
      <div
        className={`relative ${forHome ? "h-48 w-48 xl:h-50 xl:w-50" : "h-48 w-full xl:h-50"}`}
      >
        <Skeleton className="absolute inset-0 rounded-t rounded-b-none" />
      </div>

      {/* Card content */}
      <div className="mt-2 w-full space-y-2 p-3 text-sm">
        {/* Product title */}
        <Skeleton className="h-4 w-3/4" />

        {/* Rating (if !forHome) */}
        {!forHome && (
          <div className="flex items-center gap-x-0.5">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-3 w-3 rounded-full" />
            ))}
          </div>
        )}

        {/* Description */}
        {!forHome && <Skeleton className="h-8 w-full" />}

        {/* Price */}
        <Skeleton className="h-6 w-16" />

        {/* Stock info */}
        {!forHome && (
          <div className="mt-3 flex items-center justify-between gap-x-5">
            <div className="space-y-px text-xs">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-3 w-14" />
            </div>
            <Skeleton className="h-10 w-24" /> {/* Quantity Selector */}
          </div>
        )}

        {/* Rating & reviews (if forHome) */}
        {forHome && (
          <div className="flex items-center gap-x-0.5">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-3 w-3 rounded-full" />
            ))}
            <Skeleton className="ml-1.5 h-3 w-6" />
          </div>
        )}

        {/* Quantity selector */}
        {!forHome && (
          <div className="mt-3 flex items-center justify-between gap-x-5">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        )}

        {/* Add to cart button */}
        <div
          className={`${!forHome ? "mt-4" : ""} flex items-center justify-center`}
        >
          <Skeleton className="h-9 w-full rounded-none" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
