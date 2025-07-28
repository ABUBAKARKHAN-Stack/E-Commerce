import { Layout, SecondaryHeader, SideBar } from '@/components/layout/shared'
import { useEffect, useRef, useState } from 'react'
import { DashboardMainHeader, Pagination, } from '@/components/reusable/shared';
import { Package, ShoppingBag, } from 'lucide-react';
import { OrderCard, OrderFilterPanel } from '@/components/sections/user/dashboard/orders';
import { useOrderContext } from '@/context/orderContext';
import { BlurFade } from '@/components/magicui/blur-fade';
import { motion } from 'motion/react'
import { useMediaQuery } from '@/hooks/useMediaQuery';


const UserOrdersMain = () => {
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const sideBarRef = useRef<HTMLElement>(null);
    const [status, setStatus] = useState('');
    const [orderId, setOrderId] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [filterError, setFilterError] = useState('');
    const [error, setError] = useState('');
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [isInitialized, setIsInitialized] = useState(false)
    const isMobile = useMediaQuery('(max-width: 640px)');
    const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1024px)');
    const isLaptop = useMediaQuery('(min-width: 1024px) and (max-width: 1366px)');
    const isDesktop = useMediaQuery('(min-width: 1366px)');


    const { getAllOrders, ordersData, setOrdersData, ordersCount } = useOrderContext();


    const ordersFilterSort = async (params: any) => {
        try {
            const orders = await getAllOrders(params);
            setOrdersData(orders);
        } catch (err) {
            console.error("Failed to fetch filtered orders", err);
            setOrdersData([]);
        }
    }

    const getDynamicLimit = () => {
        if (isMobile) return 4;
        if (isTablet) return 6;
        if (isLaptop) return 8;
        if (isDesktop) return 10;
        return 6;
    }
    useEffect(() => {
        const newLimit = getDynamicLimit();
        if (newLimit !== limit) {
            setLimit(Number(newLimit));
        }
    }, [isDesktop, isLaptop, isMobile, isTablet])


    useEffect(() => {
        const orderFilterSortParams = localStorage.getItem('orders-filter/sort');
        const parsedOrderFilterSortParams = orderFilterSortParams ? JSON.parse(orderFilterSortParams) : {}
        if (Object.values(parsedOrderFilterSortParams).length > 0) {
            ordersFilterSort(parsedOrderFilterSortParams)
            setStatus(parsedOrderFilterSortParams.status || '');
            setSortBy(parsedOrderFilterSortParams.sortBy || 'newest');
            setOrderId(parsedOrderFilterSortParams.orderId || '');
            setLimit(parsedOrderFilterSortParams.limit || 5);
            setPage(parsedOrderFilterSortParams.page || 1);
        }
        setIsInitialized(true)
    }, [])

    useEffect(() => {
        if (!isInitialized) return;
        const params: any = {};
        if (status) params.status = status;
        if (orderId) params.orderId = orderId;
        if (sortBy) params.sortBy = sortBy;
        if (limit) params.limit = limit;
        if (page) params.page = page;

        localStorage.setItem('orders-filter/sort', JSON.stringify(params));
        ordersFilterSort(params)

    }, [
        status,
        orderId,
        sortBy,
        page,
        limit,
        isInitialized
    ]);

    useEffect(() => {
        if (!isInitialized) return;
        setPage(1);
    }, [
        status,
        orderId,
        sortBy
    ]);


    if (ordersData.length === 0) {
        return <h1>Fetching</h1>
    }


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
                                mainIcon={<ShoppingBag className="size-8 stroke-3" />}
                                mainHeading="Your Orders"
                                subIcon={<Package className="size-5 text-cyan-100 dark:text-orange-100" />}
                                subText="Track, manage, and review your recent purchases here."
                                animateClassName="orders-header"
                            />
                        </BlurFade>
                        <BlurFade
                            delay={1.5}
                            className='relative z-10'
                            direction="down"
                        >
                            <OrderFilterPanel
                                setOrderId={setOrderId}
                                setSortBy={setSortBy}
                                setStatus={setStatus}
                                status={status}
                                sortBy={sortBy}
                                totalOrders={ordersData}
                                setFilterError={setFilterError}
                                error={error}
                                setError={setError}
                            />
                        </BlurFade>

                        <BlurFade
                            inView
                            direction='right'
                            delay={page <= 1 ? 2 : 0.25}
                            key={page}
                            className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

                            <OrderCard
                                totalOrders={ordersData}
                                filterError={filterError}
                            />
                        </BlurFade>

                        {
                            ordersData?.length > 0 && <Pagination
                                totalProducts={ordersCount}
                                limit={limit}
                                setPage={setPage}
                                page={page}
                                forOrder
                            />
                        }
                    </div>
                </Layout >
            </div >
        </>
    )
}

export default UserOrdersMain