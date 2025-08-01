import { Layout } from "@/components/layout/shared";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HeroText, HeroImage } from "@/components/sections/user";
import { WaveDivider } from "@/components/reusable/user";
gsap.registerPlugin(useGSAP);

const HeroMain = () => {
  const imageContainerRef = useRef(null);
  const textContainerRef = useRef(null);
  const waveDividerTopRef = useRef(null);
  const waveDividerBottomRef = useRef(null);

  const layoutRef = useRef(null);
  const tl = useRef(gsap.timeline({ paused: true }));

  const heroItems = [
    {
      heading: "Power Up Your Productivity",
      para: "Discover the latest high-performance laptops designed for speed, power, and efficiency. Whether you're a professional, student, or creative, experience seamless multitasking and cutting-edge technology.",
      image: "./products/laptop.webp",
    },
    {
      heading: "Unleash the Ultimate Gaming Experience",
      para: "Explore top-tier gaming setups with cutting-edge graphics and lightning-fast performance. Dominate every battle with immersive visuals, high refresh rates, and ultra-responsive controls.",
      image: "./products/gamingpc.webp",
    },
    {
      heading: "Smartphones That Redefine Innovation",
      para: "Stay connected with the latest smartphones featuring stunning displays and powerful processors. Enjoy long battery life, AI-powered cameras, and the best mobile experience tailored to your needs.",
      image: "./products/smartphone.webp",
    },
    {
      heading: "Crystal-Clear Sound for Every Occasion",
      para: "Immerse yourself in high-quality audio with our premium range of headphones and speakers. Whether you're at home, work, or on the go, experience deep bass and crystal-clear sound like never before.",
      image: "./products/headphones.webp",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isFirst, setIsFirst] = useState(true);
  useGSAP(() => {
    tl.current.clear();

    if (isFirst) {
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

      setIsFirst(false);
    }

    tl.current
      .fromTo(
        imageContainerRef.current,
        { x: "100%", opacity: 0, filter: "blur(20px)" },
        { x: "0%", opacity: 1, duration: 1.5, filter: "blur(0px)" },
      )
      .fromTo(
        textContainerRef.current,
        { opacity: 0, x: -10, y: -20, filter: "blur(20px)" },
        { opacity: 1, x: 0, y: 0, filter: "blur(0px)", duration: 1.5 },
        "-=1.5",
      )
      .to(
        imageContainerRef.current,
        { x: "100%", opacity: 0, duration: 1.5 },
        "+=3",
      )
      .to(
        textContainerRef.current,
        { opacity: 0, x: 10, y: -20, filter: "blur(20px)", duration: 1.5 },
        "-=1.5",
      );

    tl.current.play();

    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev < heroItems.length - 1 ? prev + 1 : 0));
    }, 7000);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <main className="flex h-full min-h-[calc(70vh-80px)] w-full min-w-screen flex-col items-center justify-center overflow-x-hidden bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] py-16 backdrop-blur-xl md:py-24 dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <WaveDivider
        ref={waveDividerTopRef}
        position="top"
        svgClass="h-10 mt-[0.5px] sm:h-20"
      />
      <Layout ref={layoutRef}>
        {heroItems.slice(currentIndex, currentIndex + 1).map((item, i) => {
          const { heading, para, image } = item;
          return (
            <div
              key={i}
              className="flex flex-col-reverse items-center justify-center gap-4 px-4 md:flex-row md:justify-between"
            >
              <HeroText heading={heading} para={para} ref={textContainerRef} />
              <HeroImage
                image={image}
                heading={heading}
                ref={imageContainerRef}
              />
            </div>
          );
        })}
      </Layout>
      <WaveDivider
        ref={waveDividerBottomRef}
        position="bottom"
        svgClass="h-10 sm:h-20"
      />
    </main>
  );
};

export default HeroMain;
