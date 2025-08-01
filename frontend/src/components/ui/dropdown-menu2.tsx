import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// Dropdown Wrapper with GSAP Animation
const DropdownMain = ({
  children,
  className,
  isOpen,
}: {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!dropdownRef.current) return;

    if (isOpen) {
      setIsAnimating(true);
      gsap.fromTo(
        dropdownRef.current,
        {
          opacity: 0,
          y: -10,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => setIsAnimating(true),
        },
      );
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => setIsAnimating(false),
      });
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute ${className} top-12 right-0 z-50 w-40 rounded-md border-2 bg-[#F3F4F6] py-2 text-sm shadow-lg dark:bg-[#1B1B1F] dark:text-white`}
    >
      {children}
    </div>
  );
};

// Dropdown Items Container (Unchanged)
const DropdownItems = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col">{children}</div>
);

// Individual Dropdown Item (Unchanged)
const DropdownItem = ({ children }: { children: React.ReactNode }) => (
  <div className="block w-full cursor-pointer px-4 py-2 text-left transition-colors hover:bg-[#dadbdd] dark:hover:bg-zinc-700">
    {children}
  </div>
);

export { DropdownMain, DropdownItems, DropdownItem };
