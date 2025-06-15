import { forwardRef } from "react";
import { Button } from "@/components/ui/button";


type Props = {
    heading: string;
    para: string;
}
const HeroText = forwardRef<HTMLDivElement, Props>(({ heading, para }, textContainerRef) => {
    return (
        <div ref={textContainerRef} className="w-full md:w-[60%] ">
            <h1 className="text-gray-950 dark:text-white text-lg xsm:text-xl sm:text-2xl md:text-2xl xl:text-5xl font-bold mb-4">
                {heading}
            </h1>
            <p className="text-sm md:text-base xl:text-lg text-gray-900 dark:text-gray-300 mb-6">
                {para}
            </p>
            <Button variant={"default"} size={"lg"}>
                Shop Now
            </Button>
        </div>
    )
})
export default HeroText