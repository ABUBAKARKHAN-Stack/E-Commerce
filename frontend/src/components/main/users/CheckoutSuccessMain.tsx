import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { useRef } from 'react'
import { useLoaderData } from 'react-router-dom';
import {
    CheckoutOrderReceipt,
    CheckoutSuccessActionButtons,
    CheckoutSuccessIconAndText
} from '@/components/sections/user/checkout';
import { Layout } from '@/components/layout/shared';

const CheckoutSuccessMain = () => {
    const { products, totalAmount, orderId, confirmedAt } = useLoaderData();

    const containerRef = useRef(null);
    const checkIconRef = useRef(null);
    const receiptRef = useRef(null);
    const buttonsRef = useRef(null);

    useGSAP(() => {
        const container = containerRef.current;
        const checkIcon = checkIconRef.current;
        const receipt = receiptRef.current;
        const buttons = buttonsRef.current;

        if (!container || !checkIcon || !receipt) return;

        // Original simple initial states for icon, enhanced for text elements
        gsap.set(checkIcon, { scale: 0, rotation: -360, opacity: 0, });

        gsap.set('.success-title', {
            y: 60,
            opacity: 0,
            filter: 'blur(15px)',
            scale: 0.8,
            rotationX: 45
        });

        gsap.set('.success-subtitle', {
            y: 40,
            opacity: 0,
            filter: 'blur(10px)',
            scale: 0.9
        });

        gsap.set('.orderid-badge', {
            y: 30,
            opacity: 0,
            filter: 'blur(8px)',
            scale: 0.7,
            rotationY: 15
        });

        gsap.set(receipt, { y: 50, opacity: 0, filter: "blur(10px)" });
        gsap.set('.receipt-item', { x: -20, opacity: 0 });
        gsap.set(buttons, { y: 30, opacity: 0, filter: "blur(5px)" });

        const tl = gsap.timeline();

        tl
            .to(checkIcon, {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 1,
                ease: 'back.out(2)',
            })

            .to('.success-title', {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
                rotationX: 0,
                duration: 1,
                ease: 'power3.out',
            }, '-=0.3')

            .to('.success-subtitle', {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
                duration: 0.9,
                ease: 'power2.out',
            }, '-=0.4')

            .to('.orderid-badge', {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
                rotationY: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
            }, '-=0.5')

            .to(receipt, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                filter: "blur(0px)",
                ease: 'power2.out',
            }, '-=0.6')

            .to('.receipt-item', {
                x: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
            }, '-=0.7')

            .to(buttons, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                filter: "blur(0px)",
                ease: 'power2.out',
                stagger: 0.1,
                delay: 0.2
            });

        gsap.to(checkIcon, {
            y: -7.5,
            duration: 2,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1,
        });

    }, []);

    return (
        <main
            ref={containerRef}
            className='min-w-screen w-full overflow-x-hidden h-full py-10 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]'
        >
            <Layout>
                <section className="mt-10 space-y-8 max-w-2xl mx-auto w-full">
                    
                    {/* Success Icon and Text Section */}
                    <CheckoutSuccessIconAndText
                        checkIconRef={checkIconRef}
                        orderId={orderId}
                    />

                    {/*  Order Receipt Section */}
                    <CheckoutOrderReceipt
                        receiptRef={receiptRef}
                        products={products}
                        totalAmount={totalAmount}
                        confirmedAt={confirmedAt}
                    />

                    {/* Action Buttons: Track Order & Continue Shopping */}
                    <CheckoutSuccessActionButtons
                        buttonsRef={buttonsRef}
                        orderId={orderId}
                    />
                </section>
            </Layout>
        </main>
    )
}

export default CheckoutSuccessMain