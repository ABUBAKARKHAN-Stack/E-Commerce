import { BlurFade } from "@/components/magicui/blur-fade";
import { Logo } from "@/components/reusable/shared";
import { Button } from "@/components/ui/button";
import { handleScrollToSection } from "@/utils/HandleScrollToSection";

const AboutHero = () => {
  const handleLearnMoreAboutUs = () => {
    handleScrollToSection("why-choose-us");
  };

  return (
    <>
      <BlurFade
        once={false}
        direction="down"
        inView
        delay={0.75}
        className="relative"
      >
        <div className="animate-spin-slow m-auto block size-52 rounded-full border-2 border-cyan-500 shadow-md shadow-cyan-500 lg:size-80 lg:shadow-lg dark:border-orange-500 dark:shadow-orange-500"></div>
        <Logo
          width="w-96"
          className="drop-shadow-8px absolute top-1/2 left-1/2 -translate-1/2 shadow-black/20 dark:shadow-black"
        />
      </BlurFade>
      <BlurFade
        once={false}
        direction="down"
        inViewMargin="-70px"
        delay={0.5}
        inView
        className="flex flex-col gap-y-4"
      >
        <p className="text-muted-foreground mx-auto mt-4 max-w-3xl text-center text-sm sm:text-base">
          At{" "}
          <span className="font-bold text-cyan-500 dark:text-orange-500">
            ShopNex
          </span>
          , we believe in creating seamless, trustworthy, and enjoyable shopping
          experiences. Our journey started with a simple goal: to make quality
          products accessible with convenience and care.
        </p>
        <Button
          onClick={handleLearnMoreAboutUs}
          className="mx-auto w-fit"
          size={"lg"}
        >
          Learn More About Us
        </Button>
      </BlurFade>
    </>
  );
};

export default AboutHero;
