import { forwardRef } from 'react'

type Props = {
    image: string;
    heading: string;
}

const HeroImage = forwardRef<HTMLDivElement, Props>(({ image, heading }, imageContainerRef) => {
    return (
        <div ref={imageContainerRef} className="flex justify-center w-full md:w-[40%]">
            <img
                src={image}
                alt={heading}
                className="w-full drop-shadow-8px shadow-black"
            />
        </div>
    )
})

export default HeroImage