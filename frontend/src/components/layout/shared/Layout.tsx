import ScrollToTop from "@/utils/ScrollToTop";
import React, { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

// Use forwardRef to pass the ref to the main element
const Layout = forwardRef<HTMLElement, Props>(
  ({ children, className }, ref) => {
    return (
      <>
        <ScrollToTop />
        <main
          ref={ref}
          className={`xsm:max-w-xl mx-auto h-full w-full max-w-full p-4 sm:max-w-2xl md:max-w-3xl lg:max-w-[1100px] ${className || ""}`}
        >
          {children}
        </main>
      </>
    );
  },
);

// Set display name for debugging purposes
Layout.displayName = "Layout";

export default Layout;
