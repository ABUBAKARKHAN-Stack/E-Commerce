import { Layout } from "@/components/layout/shared";
import { SectionHeader, WaveDivider } from "@/components/reusable/user";
import { AboutHero } from "@/components/sections/user";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const AboutHeroMain = () => {
  const waveDividerTopRef = useRef(null);
  const waveDividerBottomRef = useRef(null);
  const tl = useRef(gsap.timeline({ paused: true }));
  useGSAP(() => {
    tl.current.play();
    tl.current
      .fromTo(
        [waveDividerTopRef.current, waveDividerBottomRef.current],
        {
          clipPath: "inset(0 100% 0 0)",
          opacity: 0,
          y: 10,
        },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.2,
        },
      )
      // Subtle breath-like motion
      .to(
        [waveDividerTopRef.current, waveDividerBottomRef.current],
        {
          scaleX: 1.01,
          duration: 1,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.1,
        },
        "-=0.5",
      );
  }, []);

  return (
    <main className="flex h-full min-h-[calc(80vh-80px)] w-full min-w-screen flex-col items-center justify-center overflow-hidden border-b-2 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] py-16 backdrop-blur-xl md:py-24 dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <WaveDivider
        ref={waveDividerTopRef}
        position="top"
        svgClass="h-10 mt-[0.5px] sm:h-20"
      />
      <Layout>
        <SectionHeader
          mainHeading="Get to Know ShopNex"
          subText="Explore our journey, core values, and the reason why thousands choose us for a smarter, seamless shopping experience every day."
        />

        <section className="mt-10 flex w-full flex-col items-center justify-center space-y-10">
          <AboutHero />
        </section>
      </Layout>
      <WaveDivider
        ref={waveDividerBottomRef}
        position="bottom"
        svgClass="h-10 sm:h-20"
      />
    </main>
  );
};

export default AboutHeroMain;
