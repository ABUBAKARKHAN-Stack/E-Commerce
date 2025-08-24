import { ProductImageSelector } from "@/components/reusable/user";
import { FC, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Lens } from "@/components/magicui/lens";

type Props = {
  thumbnails: string[];
};

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
    };
    emblaApi.on("select", onSelect);

    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, thumbnails]);

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row">
        <ProductImageSelector
          className="flex gap-3 md:flex-col"
          thumbnails={thumbnails}
          currentImageSrc={currentImageSrc}
          setCurrentImageSrc={setCurrentImageSrc}
          usingCarousel
          scrollNext={scrollNext}
          scrollPrev={scrollPrev}
        />
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {thumbnails.map((src) => {
              return (
                <div
                  className="embla__slide h-full max-h-[500px] min-h-[400px] w-full min-w-72 flex-[0_0_100%] rounded-md bg-gray-200 dark:bg-[#2c2c2e]"
                  key={src}
                >
                  <Lens
                    zoomFactor={2}
                    lensSize={175}
                    isStatic={false}
                    ariaLabel="Product Gallery Zoom Area"
                  >
                    <img
                      src={src}
                      alt={src}
                      className="m-auto h-full max-h-[500px] min-h-[400px] w-[90%] object-contain"
                    />
                  </Lens>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductImagesGallery;
