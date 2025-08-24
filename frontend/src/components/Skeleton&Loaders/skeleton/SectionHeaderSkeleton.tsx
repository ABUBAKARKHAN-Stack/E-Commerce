import { Skeleton } from "@/components/ui/skeleton";

const SectionHeaderSkeleton = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-y-4">
      <Skeleton className="h-10 w-full max-w-80" /> {/* Main Heading */}
      <Skeleton className="h-10 w-full max-w-96" /> {/*Sub Text */}
    </div>
  );
};

export default SectionHeaderSkeleton;
