import { forwardRef } from "react";

type Props = {
  image: string;
  heading: string;
};

const HeroImage = forwardRef<HTMLDivElement, Props>(
  ({ image, heading }, imageContainerRef) => {
    return (
      <div
        ref={imageContainerRef}
        className="flex w-full justify-center md:w-[40%]"
      >
        <img
          src={image}
          alt={heading}
          className="drop-shadow-8px w-full shadow-black"
        />
      </div>
    );
  },
);

export default HeroImage;
