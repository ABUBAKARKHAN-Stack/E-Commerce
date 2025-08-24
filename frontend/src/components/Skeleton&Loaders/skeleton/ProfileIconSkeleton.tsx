import { Skeleton } from "@/components/ui/skeleton";
import { UserIcon } from "lucide-react";

const ProfileIconSkeleton = () => {
  return (
    <div className="relative">
      <Skeleton className="size-9 animate-pulse rounded-full bg-cyan-400 dark:bg-orange-500" />
      <UserIcon className="absolute inset-0 m-auto size-5 stroke-[2.5px] text-white opacity-70" />
    </div>
  );
};

export default ProfileIconSkeleton;
