import { Skeleton } from "@/components/ui/skeleton";

const ViewProductSkeleton = () => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Image Skeleton */}
      <div className="relative space-y-4">
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="size-18 rounded-md" />
          ))}
        </div>
      </div>

      {/* Info Skeleton */}
      <div className="flex flex-col justify-between">
        <div className="w-full space-y-4 text-sm">
          <Skeleton className="h-6 w-3/4" /> {/* Title */}
          <Skeleton className="h-4 w-1/2" /> {/* Rating */}
          <Skeleton className="h-14 w-full" /> {/* Description */}
          <Skeleton className="h-10 w-24" /> {/* Price */}
          <Skeleton className="h-4 w-1/2" /> {/* Stock */}
          <div className="mt-3 flex items-center justify-between gap-x-5">
            <div className="space-y-px text-xs">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-3 w-14" />
            </div>
            <Skeleton className="h-10 w-24" /> {/* Quantity Selector */}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center">
          <Skeleton className="h-10 w-full rounded-none" /> {/* Add to Cart */}
        </div>
      </div>
    </div>
  );
};

export default ViewProductSkeleton;
