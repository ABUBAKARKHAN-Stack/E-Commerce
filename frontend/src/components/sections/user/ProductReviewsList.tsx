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
      <div className="py-10 text-center text-gray-500 dark:text-gray-400">
        No reviews yet. Be the first to review this product!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map(({ createdAt, rating, review }, i) => {
        const date = new Date(createdAt);

        return (
          <BlurFade
            key={i}
            once
            inView
            direction="right"
            delay={0.25 + i * 0.05}
          >
            <div className="mb-4 flex h-auto w-fit flex-col gap-y-5 rounded-sm border-0 bg-cyan-500 px-3 py-4 text-white shadow transition-all duration-300 ease-linear hover:scale-105 hover:border-[1.5px] hover:border-cyan-600/50 hover:bg-cyan-600/90 dark:bg-orange-500 dark:hover:border-orange-600/70 dark:hover:bg-orange-600/90">
              {/* Card Header */}
              <div className="flex items-center justify-center gap-x-px text-xl font-medium">
                {Array.from({ length: rating }, (_, i) => (
                  <Star key={i} className="size-5 fill-white" />
                ))}
              </div>

              {/* Review Text */}
              <div>
                <span className="font-serif text-2xl font-semibold text-white/80">
                  "
                </span>
                <span className="text-base font-light">{review}</span>
                <span className="font-serif text-2xl font-semibold text-white/80">
                  "
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-x-1 text-sm font-semibold">
                <p>
                  {formatDate(date)} &ndash; {formatTime(date)}
                </p>
              </div>
            </div>
          </BlurFade>
        );
      })}
    </div>
  );
};

export default ProductReviewsList;
