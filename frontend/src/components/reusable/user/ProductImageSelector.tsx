import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

type Props = {
    thumbnails: string[];
    currentImageSrc: string;
    setCurrentImageSrc: Dispatch<SetStateAction<string>>;
    className?: string;
    usingCarousel?: boolean;
    scrollNext?: () => void;
    scrollPrev?: () => void;
}

const ProductImageSelector: FC<Props> = ({
    thumbnails,
    currentImageSrc,
    setCurrentImageSrc,
    className = "",
    usingCarousel = false,
    scrollNext,
    scrollPrev,

}) => {

    const handleImageChange = (src: string) => {
        if (currentImageSrc === src) return;
        const currentIndex = thumbnails.indexOf(currentImageSrc);
        const newIndex = thumbnails.indexOf(src);

        setCurrentImageSrc(src);
        if (usingCarousel) {
            if (scrollNext && currentIndex < newIndex) scrollNext();
            if (scrollPrev && currentIndex > newIndex) scrollPrev()
        }
    }



    return (
        <div className={`flex ${className} gap-x-5`}>
            {
                thumbnails.map((src) => {
                    return (
                        <div key={src}
                            role="button"
                            onClick={() => handleImageChange(src)}
                            className={`${usingCarousel ? "size-18 rounded ring-1" : "xxs:size-28 size-20 rounded-lg border-2 ring-[3px]"}  border-accent-foreground/90 hover:cursor-pointer bg-accent-foreground/90 hover:bg-accent-foreground p-2 transition-[color,box-shadow]  ${currentImageSrc === src && 'border-ring ring-ring/50 ring-[3px] dark:bg-orange-500/20 dark:hover:bg-orange-500/30 bg-cyan-500/20 hover:bg-cyan-500/30 shadow-xs'}`}>
                            <img
                                src={src}
                                className='object-cover drop-shadow-2px shadow-accent'
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProductImageSelector