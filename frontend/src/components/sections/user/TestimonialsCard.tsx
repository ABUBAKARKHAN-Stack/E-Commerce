import Masonry from "react-masonry-css";
import { testimonialsData } from "@/data/testimonials";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useFormattedDateTime from "@/hooks/useFormattedDateTime";
import { BlurFade } from "@/components/magicui/blur-fade";
const Testimonials = () => {
  const { formatDate, formatTime } = useFormattedDateTime();

  return (
    <Masonry
      breakpointCols={{
        default: 3,
        1280: 3,
        1024: 2,
        768: 2,
        640: 1,
      }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {/* Testinomial Card */}
      {testimonialsData.map(({ createdAt, name, rating, review }, i) => (
        <BlurFade
          key={i}
          once={false}
          inView
          direction="right"
          delay={0.25 + i * 0.05}
        >
          <div className="mb-4 flex h-auto flex-col gap-y-5 rounded-sm border-0 bg-cyan-500 px-3 py-4 text-white shadow transition-all duration-300 ease-linear hover:scale-105 hover:border-[1.5px] hover:border-cyan-600/50 hover:bg-cyan-600/90 dark:bg-orange-500 dark:hover:border-orange-600/70 dark:hover:bg-orange-600/90">
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

            {/* Name and Date */}
            <div className="flex flex-col gap-y-1">
              <Avatar>
                <AvatarFallback className="bg-cyan-100 text-xl font-medium text-cyan-500 dark:bg-orange-200 dark:text-orange-500">
                  {name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xs font-semibold">{name}</h2>
              <div className="flex items-center gap-x-1 text-sm font-semibold">
                <p>
                  {formatDate(createdAt)} &ndash; {formatTime(createdAt)}
                </p>
              </div>
            </div>
          </div>
        </BlurFade>
      ))}
    </Masonry>
  );
};

export default Testimonials;
