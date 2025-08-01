import { FC } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";

type SectionHeaderProps = {
  mainHeading: string;
  subText: string;
  animateOnce?: boolean;
  forHome?: boolean;
};
const SectionHeader: FC<SectionHeaderProps> = ({
  mainHeading,
  subText,
  animateOnce = false,
  forHome = true,
}) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-y-4">
      <BlurFade
        direction="down"
        once={animateOnce}
        delay={forHome ? 0.25 : 0.2}
        inView
      >
        <h1 className="xsm:text-4xl text-center text-2xl font-bold text-gray-950 md:text-5xl xl:text-6xl dark:text-white">
          {mainHeading}
        </h1>
      </BlurFade>
      <BlurFade
        once={animateOnce}
        direction="down"
        delay={forHome ? 0.25 * 2 : 0.2 * 2}
        inView
      >
        <p className="mb-6 text-center text-sm text-wrap text-gray-900 md:text-base xl:text-xl dark:text-gray-300">
          {subText}
        </p>
      </BlurFade>
    </div>
  );
};

export default SectionHeader;
