import { Layout } from "../reusable";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {HeroText , HeroImage} from "@/components/reusable"
gsap.registerPlugin(useGSAP);

const HeroMain = () => {
    const imageContainerRef = useRef(null);
    const textContainerRef = useRef(null);
    const layoutRef = useRef(null);
    const tl = useRef(gsap.timeline({ paused: true }));

    const heroItems = [
        {
            heading: "Power Up Your Productivity",
            para: "Discover the latest high-performance laptops designed for speed, power, and efficiency. Whether you're a professional, student, or creative, experience seamless multitasking and cutting-edge technology.",
            image: "./products/laptop.webp"
        },
        {
            heading: "Unleash the Ultimate Gaming Experience",
            para: "Explore top-tier gaming setups with cutting-edge graphics and lightning-fast performance. Dominate every battle with immersive visuals, high refresh rates, and ultra-responsive controls.",
            image: "./products/gamingpc.webp"
        },
        {
            heading: "Smartphones That Redefine Innovation",
            para: "Stay connected with the latest smartphones featuring stunning displays and powerful processors. Enjoy long battery life, AI-powered cameras, and the best mobile experience tailored to your needs.",
            image: "./products/smartphone.webp"
        },
        {
            heading: "Crystal-Clear Sound for Every Occasion",
            para: "Immerse yourself in high-quality audio with our premium range of headphones and speakers. Whether you're at home, work, or on the go, experience deep bass and crystal-clear sound like never before.",
            image: "./products/headphones.png"
        }
    ];


    const [currentIndex, setCurrentIndex] = useState(0);

    // Animation logic
    useGSAP(() => {
        // Restart timeline on index change
        tl.current.clear();

        tl.current
            .fromTo(
                imageContainerRef.current,
                { x: "100%", opacity: 0 , filter: "blur(20px)" },
                { x: "0%", opacity: 1, duration: 1.5 , filter:"blur(0px)"}
            )
            .fromTo(
                textContainerRef.current,
                { opacity: 0, x: -10, y: -20, filter: "blur(20px)" },
                { opacity: 1, x: 0, y: 0, filter: "blur(0px)", duration: 1.5 },
                "-=1.5"
            )
            .to(
                imageContainerRef.current,
                { x: "100%", opacity: 0, duration: 1.5 },
                "+=3" // Hold the slide for a while before exit animation
            )
            .to(
                textContainerRef.current,
                { opacity: 0, x: 10, y: -20, filter: "blur(20px)", duration: 1.5 },
                "-=1.5"
            );

        tl.current.play();

        // Set a timeout to update the index after the animation completes
        const timeout = setTimeout(() => {
            setCurrentIndex((prev) =>
                prev < heroItems.length - 1 ? prev + 1 : 0
            );
        }, 7000); // Match total animation duration

        return () => clearTimeout(timeout);
    }, [currentIndex]); // Depend on currentIndex to re-trigger animation

    return (
        <main className="w-screen h-[calc(100vh-80px)] bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F] backdrop-blur-xl border-b-2 flex flex-col items-center justify-center">
            {heroItems.slice(currentIndex, currentIndex + 1).map((item, i) => {
                const { heading, para, image } = item;
                return (
                    <Layout ref={layoutRef} key={i} className="flex flex-col-reverse gap-y-20 justify-center md:gap-0 md:flex-row md:justify-between items-center">
                         <HeroText heading={heading} para={para} ref={textContainerRef} />
                         <HeroImage image={image} heading={heading} ref={imageContainerRef} />
                    </Layout>
                );
            })}
        </main>
    );
};

export default HeroMain;
