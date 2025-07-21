import { FC } from "react";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useFormattedDateTime from "@/hooks/useFormattedDateTime";
import { BlurFade } from "@/components/magicui/blur-fade";
import { IReview } from "@/types/main.types";

type Props = {
    reviews: IReview[];
};

const ProductReviewsList: FC<Props> = ({ reviews }) => {
    const { formatDate, formatTime } = useFormattedDateTime();



    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                No reviews yet. Be the first to review this product!
            </div>
        );
    }

    return (
        <div className="space-y-6 ">
            {reviews.map(({ createdAt, rating, review }, i) => {
                const date = new Date(createdAt)

                return (
                    <BlurFade key={i} once inView direction="right" delay={0.25 + i * 0.05}>
                        <div className="shadow w-fit h-auto mb-4 py-4 px-3 flex flex-col gap-y-5 rounded-sm dark:bg-orange-500 bg-cyan-500 dark:hover:bg-orange-600/90 hover:bg-cyan-600/90 transition-all ease-linear border-0 hover:border-[1.5px] dark:hover:border-orange-600/70 hover:border-cyan-600/50 duration-300 hover:scale-105 text-white">
                            {/* Card Header */}
                            <div className="flex justify-center items-center gap-x-px text-xl font-medium">
                                {Array.from({ length: rating }, (_, i) => (
                                    <Star key={i} className="size-5 fill-white" />
                                ))}
                            </div>

                            {/* Review Text */}
                            <div>
                                <span className="text-2xl text-white/80 font-semibold font-serif">"</span>
                                <span className="text-base font-light">{review}</span>
                                <span className="text-2xl text-white/80 font-semibold font-serif">"</span>
                            </div>

                            {/* Date */}
                                <div className="flex items-center gap-x-1 font-semibold text-sm">
                                    <p>{formatDate(date)} &ndash; {formatTime(date)}</p>
                                </div>
                        </div>
                    </BlurFade>
                )
            })}
        </div>
    );
};

export default ProductReviewsList;
