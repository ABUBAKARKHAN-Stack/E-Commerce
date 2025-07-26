import { Layout, SecondaryHeader, SideBar } from '@/components/layout/shared'
import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { animations } from '@/utils/animations/animations';
import { DashboardMainHeader, } from '@/components/reusable/shared';
import { Package, ShoppingBag, } from 'lucide-react';
import { OrderCard, OrderFilterPanel } from '@/components/sections/user/dashboard/orders';
import { useOrderContext } from '@/context/orderContext';


const UserOrdersMain = () => {
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const sideBarRef = useRef<HTMLElement>(null);
    const [status, setStatus] = useState('');
    const [orderId, setOrderId] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [filterError, setFilterError] = useState('');
    const [error, setError] = useState('');



    const { getAllOrders, totalOrders } = useOrderContext();


    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: {
                duration: 1.5,
                ease: "power4.out"
            }
        });

        tl.fromTo(
            headerRef.current,
            { opacity: 0, y: -100 },
            { opacity: 1, y: 0 }
        ).fromTo(
            sideBarRef.current,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0 },
            "<0.3"
        );



        gsap.fromTo(
            '.orders-header',
            animations.dashboardSectionHeader.from,
            {
                ...animations.dashboardSectionHeader.to,
                scrollTrigger: {
                    trigger: '.orders-header',
                    start: "top 90%",
                    end: "bottom top",
                    toggleActions: "play reverse play reverse",
                },
                delay: 1.75
            }
        );
    }, []);

    useEffect(() => {
        const params: any = {};
        if (status) params.status = status;
        if (orderId) params.orderId = orderId;
        if (sortBy) params.sortBy = sortBy;

        (async () => {
            await getAllOrders(params);
        })();
    }, [status, orderId, sortBy]);


    return (
        <>
            <SecondaryHeader
                setIsOpen={setIsOpen}
                ref={headerRef}
            />
            <div className="flex my-5">
                <SideBar ref={sideBarRef} isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} />
                <Layout>
                    <div className="px-4 space-y-10">
                        <DashboardMainHeader
                            mainIcon={<ShoppingBag className="size-8 stroke-3" />}
                            mainHeading="Your Orders"
                            subIcon={<Package className="size-5 text-cyan-100 dark:text-orange-100" />}
                            subText="Track, manage, and review your recent purchases here."
                            animateClassName="orders-header"
                        />

                        <OrderFilterPanel
                            setOrderId={setOrderId}
                            setSortBy={setSortBy}
                            setStatus={setStatus}
                            status={status}
                            sortBy={sortBy}
                            totalOrders={totalOrders}
                            setFilterError={setFilterError}
                            error={error}
                            setError={setError}
                        />

                        <OrderCard
                            totalOrders={totalOrders}
                            filterError={filterError}
                        />

                    </div>
                </Layout>
            </div>
        </>
    )
}

export default UserOrdersMain