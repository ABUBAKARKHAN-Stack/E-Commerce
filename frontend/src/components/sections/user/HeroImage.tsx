import { forwardRef } from 'react'

type Props = {
    image: string;
    heading: string;
}

const HeroImage = forwardRef<HTMLDivElement, Props>(({ image, heading }, imageContainerRef) => {
    return (
        <div ref={imageContainerRef} className="w-3/4 xsm:w-fit md:w-[40%]">
            <img src={image} className="w-full drop-shadow-xl" alt={heading} />
        </div>
    )
})

export default HeroImage