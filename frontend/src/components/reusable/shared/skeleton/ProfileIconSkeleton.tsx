import { Skeleton } from '@/components/ui/skeleton'
import { UserIcon } from 'lucide-react'

const ProfileIconSkeleton = () => {
    return (
        <div className="relative">
            <Skeleton className="size-9 animate-pulse dark:bg-orange-500 bg-cyan-400 rounded-full" />
            <UserIcon className="absolute inset-0 m-auto text-white opacity-70 size-5 stroke-[2.5px]" />
        </div>
    )
}

export default ProfileIconSkeleton