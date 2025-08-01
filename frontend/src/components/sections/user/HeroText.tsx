import { forwardRef } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  heading: string;
  para: string;
};
const HeroText = forwardRef<HTMLDivElement, Props>(
  ({ heading, para }, textContainerRef) => {
    return (
      <div ref={textContainerRef} className="w-full md:w-[60%]">
        <h1 className="xsm:text-xl mb-4 text-lg font-bold text-gray-950 sm:text-2xl md:text-2xl xl:text-5xl dark:text-white">
          {heading}
        </h1>
        <p className="mb-6 text-sm text-gray-900 md:text-base xl:text-lg dark:text-gray-300">
          {para}
        </p>
        <Button variant={"default"} size={"lg"}>
          Shop Now
        </Button>
      </div>
    );
  },
);
export default HeroText;
