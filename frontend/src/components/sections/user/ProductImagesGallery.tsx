import { ProductImageSelector } from '@/components/reusable/user'
import { FC, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

type Props = {
    thumbnails: string[];
}

const ProductImagesGallery: FC<Props> = ({ thumbnails }) => {
    const [currentImageSrc, setCurrentImageSrc] = useState(thumbnails[0]);
    const [emblaRef, emblaApi] = useEmblaCarousel();

    const scrollPrev = () => emblaApi?.scrollPrev();
    const scrollNext = () => emblaApi?.scrollNext();

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            const selectedIndex = emblaApi?.selectedScrollSnap();
            const thumbnail = thumbnails[selectedIndex];
            setCurrentImageSrc(thumbnail);
        }
        emblaApi.on("select", onSelect)

        onSelect();

        return () => {
            emblaApi.off('select', onSelect);
        };

    }, [emblaApi, thumbnails])

    return (
        <>
            <div className='flex flex-col md:flex-row gap-6'>
                    <ProductImageSelector
                        className="flex md:flex-col gap-3"
                        thumbnails={thumbnails}
                        currentImageSrc={currentImageSrc}
                        setCurrentImageSrc={setCurrentImageSrc}
                        usingCarousel
                        scrollNext={scrollNext}
                        scrollPrev={scrollPrev}
                    />
                    <div className='w-full overflow-hidden' ref={emblaRef}>
                        <div className='flex'>
                            {thumbnails.map((src) => {
                                return (
                                    <div className="embla__slide flex-[0_0_100%] min-w-72 dark:bg-[#2c2c2e] bg-gray-200 min-h-[400px] rounded-md max-h-[500px] " key={src}>
                                        <img
                                            src={src}
                                            alt={src}
                                            className="object-contain w-[90%] mx-auto h-full"
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
            </div>
        </>

    )
}

export default ProductImagesGallery