import ScrollToTop from '@/utils/ScrollToTop';
import React, { forwardRef } from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
};

// Use forwardRef to pass the ref to the main element
const Layout = forwardRef<HTMLElement, Props>(({ children, className }, ref) => {
    return (
        <>
            <ScrollToTop />
            <main ref={ref} className={`w-full h-full p-4  max-w-full xsm:max-w-xl  sm:max-w-2xl md:max-w-3xl lg:max-w-[1100px] mx-auto ${className || ''}`}>
                {children}
            </main>
        </>
    );
});

// Set display name for debugging purposes
Layout.displayName = 'Layout';

export default Layout;