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
                640: 1
            }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {/* Testinomial Card */}
            {testimonialsData.map(({ createdAt, name, rating, review }, i) => (
                <BlurFade key={i} once={false} inView direction="right" delay={0.25 + i * 0.05}>
                    <div className="shadow h-auto mb-4 py-4 px-3 flex flex-col gap-y-5 rounded-sm dark:bg-orange-500 bg-cyan-500 dark:hover:bg-orange-600/90 hover:bg-cyan-600/90 transition-all ease-linear border-0 hover:border-[1.5px] dark:hover:border-orange-600/70 hover:border-cyan-600/50 duration-300 hover:scale-105 text-white">
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

                        {/* Name and Date */}
                        <div className="flex flex-col gap-y-1">
                            <Avatar>
                                <AvatarFallback className="dark:bg-orange-200 dark:text-orange-500 bg-cyan-100 text-cyan-500 font-medium text-xl">
                                    {name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <h2 className="font-semibold text-xs">{name}</h2>
                            <div className="flex items-center gap-x-1 font-semibold text-sm">
                                <p>{formatDate(createdAt)} &ndash; {formatTime(createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </BlurFade>
            ))}
        </Masonry>
    )
}

export default Testimonials