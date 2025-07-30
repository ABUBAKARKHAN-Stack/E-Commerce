import { useRef, useState } from "react";
import { motion } from 'motion/react'
import { Layout, SecondaryHeader, SideBar } from "@/components/layout/shared";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DashboardMainHeader } from "@/components/reusable/shared";
import { Package, ShoppingBag } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import useFormattedDateTime from "@/hooks/useFormattedDateTime";
import {
    CreditCard,
    Truck,
    Phone,
    Mail,
    MapPin,
    PackageCheck,
    CalendarCheck2,
    PackageX,
    DollarSign,
    Undo2,
} from "lucide-react";
import { OrderIdBadge, OrderStatusBadge, PaymentStatusBadge } from "@/components/reusable/user";
import { PaymentMethod } from "@/types/main.types";
import { OrderDetails } from "@/components/sections/user/dashboard/orders";


const UserOrderMain = () => {
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const sideBarRef = useRef<HTMLElement>(null);
    const {
        products,
        orderId,
        totalAmount,
        confirmedAt,
        orderStatus,
        shippingAddress,
        shippingMethod,
        shipping,
        paymentStatus,
        refund,
        paymentMethod,
        isDelivered
    } = useLoaderData();







    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: [0.165, 0.84, 0.44, 1], duration: 1.5 }}

            >
                <SecondaryHeader
                    setIsOpen={setIsOpen}
                    ref={headerRef}
                />
            </motion.div >
            <div className="flex my-5">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ease: [0.165, 0.84, 0.44, 1], duration: 1.5 }}

                >
                    <SideBar ref={sideBarRef} isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} />
                </motion.div>
                <Layout>
                    <div className="px-4 space-y-10">
                        <BlurFade
                            delay={1}
                            duration={0.5}
                            blur='50px'
                            direction="down"
                        >
                            <DashboardMainHeader
                                mainIcon={<Package className="size-8 stroke-3" />}
                                mainHeading="Order Details"
                                subIcon={<ShoppingBag className="size-5 text-cyan-100 dark:text-orange-100" />}
                                subText="Review your order status, payment details, and itemized breakdown here."
                                animateClassName="order-details-header"
                            />

                        </BlurFade>




                        <OrderDetails
                            confirmedAt={confirmedAt}
                            isDelivered={isDelivered}
                            orderId={orderId}
                            orderStatus={orderStatus}
                            paymentMethod={paymentMethod}
                            paymentStatus={paymentStatus}
                            products={products}
                            refund={refund}
                            shipping={shipping}
                            shippingAddress={shippingAddress}
                            shippingMethod={shippingMethod}
                            totalAmount={totalAmount}

                        />

                    </div>
                </Layout >
            </div >
        </>
    )
}

export default UserOrderMain