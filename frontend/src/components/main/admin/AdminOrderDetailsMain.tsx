import { AdminHeader } from '@/components/layout/admin';
import { Layout, SideBar } from '@/components/layout/shared';
import { DashboardMainHeader } from '@/components/reusable/shared';
import { OrderDetails } from '@/components/sections/admin/orders';
import { Package, ShoppingBag } from 'lucide-react';
import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

const AdminOrderDetailsMain = () => {
    const order = useLoaderData();
    const [isOpen, setIsOpen] = useState(false)
    console.log(order);


    return (
        <>
            <AdminHeader setIsOpen={setIsOpen} />
            <div className="my-5 flex">
                <SideBar
                    isDrawerOpen={isOpen}
                    setIsDrawerOpen={setIsOpen}
                />
                <Layout>
                    <div className="space-y-10 px-4">

                        <DashboardMainHeader
                            mainIcon={<ShoppingBag className="md:size-8 stroke-3" />}
                            mainHeading="Order Details"
                            subIcon={<Package className="size-5 xsm:block hidden text-cyan-100 dark:text-orange-100" />}
                            subText="View full order details — customer, shipping, payment, items, and timeline — and manage order status through each stage."
                        />

                        {/* Order Full Details Section */}

                        <OrderDetails
                            orderId={order.orderId}
                            orderPlaceAt={order.orderPlaceAt}
                            orderStatus={order.orderStatus}
                            paymentStatus={order.paymentStatus}
                            products={order.products}
                            refund={order.refund}
                            totalAmount={order.totalAmount}
                            confirmedAt={order.confirmedAt}
                            deliveryDate={order.deliveryDate}
                            isDelivered={order.isDelivered}
                            paymentMethod={order.paymentMethod}
                            shipping={order.shipping}
                            shippingMethod={order.shippingMethod}
                            shippingAddress={order.shippingAddress}
                            cancelledAt={order.cancelledAt}
                        />
                    </div>
                </Layout >
            </div >
        </>
    )
}

export default AdminOrderDetailsMain