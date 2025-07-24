import { BlurFade } from '@/components/magicui/blur-fade'
import { Logo } from '@/components/reusable/shared'
import { Button } from '@/components/ui/button'
import { handleScrollToSection } from '@/utils/HandleScrollToSection'

const AboutHero = () => {
    const handleLearnMoreAboutUs = () => {
        handleScrollToSection('why-choose-us')
    }

    return (
        <>
            <BlurFade
                once={false}
                direction='down'
                inView
                delay={0.75}
                className='relative'>
                <div className="lg:size-80 block size-52  animate-spin-slow m-auto rounded-full lg:shadow-lg shadow-md border-2 dark:border-orange-500 dark:shadow-orange-500 shadow-cyan-500 border-cyan-500 ">
                </div>
                <Logo width='w-96' className='drop-shadow-8px absolute top-1/2 left-1/2 -translate-1/2 dark:shadow-black shadow-black/20' />
            </BlurFade>
            <BlurFade
                once={false}
                direction='down'
                inViewMargin='-70px'
                delay={0.5}
                inView
                className='flex gap-y-4 flex-col'>
                <p className="text-center max-w-3xl mx-auto text-muted-foreground mt-4 text-sm sm:text-base">
                    At <span className='font-bold dark:text-orange-500 text-cyan-500'>ShopNex</span>, we believe in creating seamless, trustworthy, and enjoyable shopping experiences. Our journey started with a simple goal: to make quality products accessible with convenience and care.
                </p>
                <Button
                    onClick={handleLearnMoreAboutUs}
                    className='w-fit mx-auto' size={"lg"}>
                    Learn More About Us
                </Button>
            </BlurFade>
        </>
    )
}

export default AboutHero