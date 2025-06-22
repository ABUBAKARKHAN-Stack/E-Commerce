import { whyChooseUsData } from "@/data/whyChooseUs";
import ShopnexLogo from '@/assets/shopnex.webp'
import { BlurFade } from "@/components/magicui/blur-fade";


const WhyChooseUs = () => {
    const leftItems = whyChooseUsData.slice(0, 3);
    const rightItems = whyChooseUsData.slice(3);

    return (
        <>
            <div className="space-y-10 mr-auto">
                {
                    leftItems.map(({ icon, text, heading }, i) => (
                        <BlurFade key={i} inView direction="up" delay={0.25 + i * 0.05} once={false} className="space-y-2">
                            <div className="flex  md:items-end items-center flex-col gap-y-1.5">
                                <div className="size-11.5 flex justify-center items-center rounded-full dark:bg-orange-500  bg-cyan-500">
                                    {icon}
                                </div>
                                <h2 className="font-semibold tracking-wide text-base text-gray-950 dark:text-white">{heading}</h2>
                            </div>
                            <p className="md:text-end md:w-full w-3/4 text-center dark:text-gray-300 text-gray-900 font-light md:mx-0 mx-auto text-sm">
                                {text}
                            </p>
                        </BlurFade>
                    ))
                }
            </div>
            <BlurFade inView direction='up' delay={0.5} inViewMargin="-50px" once={false} className="flex justify-center items-center">
                <div className="lg:size-80 md:block hidden size-52  animate-pulse m-auto rounded-full shadow-20px border-2 dark:border-orange-500 dark:shadow-orange-500 shadow-cyan-500 border-cyan-500 ">
                </div>
                <img src={ShopnexLogo} alt="Shopnex Logo" className="lg:w-78 md:block hidden w-52 absolute  top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 my-auto   drop-shadow-xl dark:shadow-black shadow-gray-300 dark:invert-0 invert" />
            </BlurFade>

            <div className="space-y-10 ml-auto">
                {
                    rightItems.map(({ icon, text, heading }, i) => (
                        <BlurFade key={i} inView direction='up' delay={0.25 + i * 0.05} once={false} className="space-y-2">
                            <div className="flex md:items-start items-center flex-col gap-y-1.5">
                                <div className="size-11.5 flex justify-center items-center rounded-full dark:bg-orange-500  bg-cyan-500">
                                    {icon}
                                </div>
                                <h2 className="font-semibold tracking-wide text-base text-gray-950 dark:text-white">{heading}</h2>
                            </div>
                            <p className="md:text-start md:w-full w-3/4 text-center dark:text-gray-300 text-gray-900 font-light md:mx-0 mx-auto text-sm">
                                {text}
                            </p>
                        </BlurFade>
                    ))
                }
            </div>
        </>
    )
}

export default WhyChooseUs