import { whyChooseUsData } from "@/data/whyChooseUs";
import ShopnexLogo from "@/assets/shopnex.webp";
import { BlurFade } from "@/components/magicui/blur-fade";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const WhyChooseUs = () => {
  const leftItems = whyChooseUsData.slice(0, 3);
  const rightItems = whyChooseUsData.slice(3);
  const isMd = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <div className="mr-auto space-y-10">
        {leftItems.map(({ icon, text, heading }, i) => (
          <BlurFade
            key={i}
            inView
            direction="right"
            delay={0.25 + i * 0.05}
            once={false}
            className="space-y-2"
          >
            <div className="flex flex-col items-center gap-y-1.5 md:items-end">
              <div className="flex size-11.5 items-center justify-center rounded-full bg-cyan-500 dark:bg-orange-500">
                {icon}
              </div>
              <h2 className="text-base font-semibold tracking-wide text-gray-950 dark:text-white">
                {heading}
              </h2>
            </div>
            <p className="mx-auto w-3/4 text-center text-sm font-light text-gray-900 md:mx-0 md:w-full md:text-end dark:text-gray-300">
              {text}
            </p>
          </BlurFade>
        ))}
      </div>

      <BlurFade
        inView
        direction="up"
        delay={0.5}
        inViewMargin="-50px"
        once={false}
        className="flex items-center justify-center"
      >
        <div className="shadow-20px m-auto hidden size-52 animate-pulse rounded-full border-2 border-cyan-500 shadow-cyan-500 md:block lg:size-80 dark:border-orange-500 dark:shadow-orange-500"></div>
        <img
          src={ShopnexLogo}
          alt="Shopnex Logo"
          className="drop-shadow-8px absolute top-1/2 left-1/2 z-10 my-auto hidden w-52 -translate-x-1/2 -translate-y-1/2 transform shadow-gray-300 invert md:block lg:w-78 dark:shadow-black dark:invert-0"
        />
      </BlurFade>

      <div className="ml-auto space-y-10">
        {rightItems.map(({ icon, text, heading }, i) => (
          <BlurFade
            key={i}
            inView
            direction={isMd ? "right" : "left"}
            delay={0.25 + i * 0.05}
            once={false}
            className="space-y-2"
          >
            <div className="flex flex-col items-center gap-y-1.5 md:items-start">
              <div className="flex size-11.5 items-center justify-center rounded-full bg-cyan-500 dark:bg-orange-500">
                {icon}
              </div>
              <h2 className="text-base font-semibold tracking-wide text-gray-950 dark:text-white">
                {heading}
              </h2>
            </div>
            <p className="mx-auto w-3/4 text-center text-sm font-light text-gray-900 md:mx-0 md:w-full md:text-start dark:text-gray-300">
              {text}
            </p>
          </BlurFade>
        ))}
      </div>
    </>
  );
};

export default WhyChooseUs;
