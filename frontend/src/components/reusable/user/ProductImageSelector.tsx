import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type Props = {
  thumbnails: string[];
  currentImageSrc: string;
  setCurrentImageSrc: Dispatch<SetStateAction<string>>;
  className?: string;
  usingCarousel?: boolean;
  scrollNext?: () => void;
  scrollPrev?: () => void;
};

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
      if (scrollPrev && currentIndex > newIndex) scrollPrev();
    }
  };

  return (
    <div className={`flex ${className} gap-x-5`}>
      {thumbnails.map((src) => {
        return (
          <div
            key={src}
            role="button"
            onClick={() => handleImageChange(src)}
            className={`${usingCarousel ? "size-18 rounded ring-1" : "xxs:size-28 size-20 rounded-lg border-2 ring-[3px]"} border-accent-foreground/90 bg-accent-foreground/90 hover:bg-accent-foreground p-2 transition-[color,box-shadow] hover:cursor-pointer ${currentImageSrc === src && "border-ring ring-ring/50 bg-cyan-500/20 ring-[3px] shadow-xs hover:bg-cyan-500/30 dark:bg-orange-500/20 dark:hover:bg-orange-500/30"}`}
          >
            <img
              src={src}
              className="drop-shadow-2px shadow-accent object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductImageSelector;
