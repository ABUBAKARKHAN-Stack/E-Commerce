import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

interface Props {}

const QuantitySelectorSkeleton: FC<Props> = () => {
  return (
    <div className="flex h-9.5 w-full rounded-xl border-2">
      {/* Plus Button Skeleton */}
      <div className="flex h-full w-full items-center justify-center rounded-r-none">
        <Skeleton className="h-5 w-5 rounded-sm" />
      </div>

      <Separator orientation="vertical" />

      {/* Input Field Skeleton */}
      <div className="flex h-full w-full items-center justify-center">
        <Skeleton className="h-4 w-8" />
      </div>

      <Separator orientation="vertical" />

      {/* Minus Button Skeleton */}
      <div className="flex h-full w-full items-center justify-center rounded-l-none">
        <Skeleton className="h-5 w-5 rounded-sm" />
      </div>
    </div>
  );
};

export default QuantitySelectorSkeleton;
