import { useRef, useState } from "react";
import { motion } from 'motion/react'
import { Layout, SecondaryHeader, SideBar } from "@/components/layout/shared";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DashboardMainHeader } from "@/components/reusable/shared";
import { Package, ShoppingBag } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import { Badge } from "@/components/ui/badge";


const UserOrderMain = () => {
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const sideBarRef = useRef<HTMLElement>(null);
    const data = useLoaderData()

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

                        <div className="bg-muted p-6 rounded-xl border border-border shadow-sm space-y-4">
                            {/* Order Summary Header */}
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm text-muted-foreground">Order ID:</span>
                                    <span className="text-base font-semibold text-foreground tracking-tight">J4W2TL7z</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="error">Cancelled</Badge>
                                    <Badge variant="info" className="capitalize">{`Refunded`}</Badge>
                                </div>
                            </div>

                            {/* Shipping Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                <div>
                                    <p className="font-medium text-foreground mb-1">Shipping To:</p>
                                    <p>{`AbubakarXD7`}</p>
                                    <p>{`sdfwr`}{", "}wer, ewr</p>
                                    <p>{`ewr - ewrer`}</p>
                                    <p className="mt-1">{`03257030253`}</p>
                                    <p>{`abubakarxd7@gmail.com`}</p>
                                </div>

                                <div>
                                    <p className="font-medium text-foreground mb-1">Shipping Method:</p>
                                    <p>{`STANDARD`}</p>
                                    <p className="mt-1 font-medium text-foreground">Shipping Cost: <span className="font-semibold text-foreground">${6.99}</span></p>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                <div>
                                    <p className="font-medium text-foreground mb-1">Payment Method:</p>
                                    <p className="capitalize">Stripe</p>
                                    <p className="mt-1">Intent ID: <span className="text-foreground font-medium">pi_3RpbsuDex33SxCGm3iRLpJQx</span></p>
                                </div>

                                <div>
                                    <p className="font-medium text-foreground mb-1">Refund Details:</p>
                                    <p>Amount: <span className="text-foreground font-semibold">${299}</span></p>
                                    <p>Refunded At: <span className="text-foreground font-medium">{`Jul 27, 2025`}</span></p>
                                    <p>Stripe Refund ID: <span className="text-foreground">{`re_3RpbsuDex33SxCGm3AWBazkf`}</span></p>
                                </div>
                            </div>

                            {/* Order Dates */}
                            <div className="text-sm text-muted-foreground space-y-1">
                                <p>Placed On: <span className="text-foreground font-medium">{`Jul 27, 2025`}</span></p>
                                <p>Confirmed At: <span className="text-foreground font-medium">{`Jul 27, 2025`}</span></p>
                                <p>Delivered: <span className="text-foreground font-medium">{`No`}</span></p>
                            </div>

                            {/* Cart Summary */}
                            <div className="border-t pt-4 text-sm text-muted-foreground">
                                <p className="mb-1 font-medium text-foreground">Order Items:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>
                                        Product ID: <span className="text-foreground font-medium">685434a8b0582801d2b0f59e</span> — Quantity: <span className="font-semibold text-foreground">1</span>
                                    </li>
                                </ul>
                                <p className="mt-2">
                                    Total Amount: <span className="font-semibold text-foreground">${299}</span>
                                </p>
                            </div>
                        </div>

                    </div>
                </Layout >
            </div >
        </>
    )
}

export default UserOrderMain