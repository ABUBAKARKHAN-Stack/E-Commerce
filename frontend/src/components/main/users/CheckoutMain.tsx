import { Layout } from '@/components/layout/shared';
import { BlurFade } from '@/components/magicui/blur-fade';
import { SectionHeader } from '@/components/reusable/user';
import { CheckoutForm, CheckSummary, ShippingAddressForm, ShippingMethod } from '@/components/sections/user/checkout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { shippingAddressSchema } from '@/schemas/checkoutSchema';
import { CheckoutTabsType } from '@/types/main.types';
import { handleScrollToSection } from '@/utils/HandleScrollToSection';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom'
import { z } from 'zod';


const CheckoutMain = () => {
    const { totalAmount, products } = useLoaderData();
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
    const [activeTab, setActiveTab] = useState<CheckoutTabsType>("shipping-address");
    const [shippingAddress, setShippingAddress] = useState<z.infer<typeof shippingAddressSchema>>({
        addressLine1: "",
        city: "",
        country: "",
        email: "",
        fullName: "",
        phone: "",
        postalCode: "",
        state: "",
        addressLine2: ""
    })
    const [shippingMethod, setShippingMethod] = useState("");
    const [shippingAddressCompleted, setShippingAddressCompleted] = useState(false);


    const handleNextTab = () => {
        if (activeTab === "payment") return;
        switch (activeTab) {
            case "shipping-address":
                if (!shippingAddressCompleted) return;
                setActiveTab("shipping-method");
                handleScrollToSection('shipping-method-section')
                break;
            case "shipping-method":
                if (!shippingMethod) return;
                setActiveTab("checkout-summary");
                handleScrollToSection('checkout-summary-section')
                break;
            case "checkout-summary":
                setActiveTab("payment");
                handleScrollToSection('payment-section')
                break;
            default:
                break;
        }


    };




    const handlePreviousTab = () => {
        if (activeTab === "shipping-address") return;
        switch (activeTab) {
            case "shipping-method":
                setActiveTab("shipping-address")
                handleScrollToSection('shipping-address-section')

                break;
            case "checkout-summary":
                setActiveTab("shipping-method")
                handleScrollToSection('shipping-method-section')

                break;
            case "payment":
                setActiveTab("checkout-summary")
                handleScrollToSection('checkout-summary-section')
                break;
            default:
                setActiveTab("payment")
                break;
        }
    }


    return (
        <main
            className='min-w-screen w-full overflow-x-hidden h-full py-10 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]  
            backdrop-blur-xl relative border-b-2'>
            <Layout>
                <SectionHeader
                    animateOnce
                    mainHeading="Secure Checkout"
                    subText="Review your details and finalize your purchase with confidence."
                />
                <section className='mt-10 space-y-6 shipping-method-section checkout-summary-section payment-section shipping-address-section'>

                    <div className="flex flex-wrap justify-between items-center gap-4 md:gap-0">
                        {[
                            { step: 1, label: "Shipping Address", value: "shipping-address" },
                            { step: 2, label: "Shipping Method", value: "shipping-method" },
                            { step: 3, label: "Checkout Summary", value: "checkout-summary" },
                            { step: 4, label: "Payment", value: "payment" },
                        ].map(({ step, label, value }) => (
                            <div key={step} className="flex flex-col items-center gap-y-2 flex-1 min-w-[80px]">
                                <div className={`size-12 transition-colors ease-linear duration-100 flex justify-center items-center rounded-full ${activeTab === value ? "dark:bg-orange-500 dark:text-orange-200 bg-cyan-500 text-cyan-100" : "dark:bg-orange-200 dark:text-orange-500 bg-cyan-100 text-cyan-500"}  font-semibold`}>
                                    {step}
                                </div>
                                <span className="text-xs font-medium text-center">{label}</span>
                            </div>
                        ))}
                    </div>
                    <Separator
                        className='border-2'
                    />

                    <BlurFade
                        delay={0.25 * 3}
                        direction='down'
                    >


                        <ShippingAddressForm
                            setShippingAddress={setShippingAddress}
                            setShippingAddressCompleted={setShippingAddressCompleted}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />


                        <ShippingMethod
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            setShippingMethod={setShippingMethod}
                            totalAmount={totalAmount}
                        />


                        {/* Checkout Summary Section */}
                        <CheckSummary
                            products={products}
                            totalAmount={totalAmount}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            shippingMethod={shippingMethod}
                        />

                        {/* Checkout Form Section */}
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                totalAmount={totalAmount}
                                shippingAddressCompleted={shippingAddressCompleted}
                                activeTab={activeTab}
                                shippingAddress={shippingAddress}
                                shippingMethod={shippingMethod}

                            />
                        </Elements>

                    </BlurFade>
                    <div className='flex justify-between items-center'>
                        {
                            ["shipping-method", "payment", "checkout-summary"].includes(activeTab) && (
                                <Button onClick={handlePreviousTab}>
                                    Previous Tab
                                </Button>
                            )
                        }

                        {
                            ["shipping-address", "shipping-method", "checkout-summary"].includes(activeTab) && (
                                <Button
                                    onClick={handleNextTab}
                                    disabled={
                                        (activeTab === "shipping-address") ||
                                        (activeTab === "shipping-method" && !shippingMethod)
                                    }
                                >
                                    Next Tab
                                </Button>
                            )
                        }
                    </div>
                </section>
            </Layout>

        </main>
    )
}

export default CheckoutMain



