import { forwardRef } from 'react'

type Props = {
    image: string;
    heading: string;
}

const HeroImage = forwardRef<HTMLDivElement, Props>(({ image, heading }, imageContainerRef) => {
    return (
        <div ref={imageContainerRef} className="w-full sm:w-3/4 md:w-[40%] flex justify-center">
            <img
                src={image}
                alt={heading}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md  drop-shadow-xl"
            />
        </div>
    )
})

export default HeroImage