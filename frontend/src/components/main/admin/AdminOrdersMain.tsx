import { AdminHeader } from '@/components/layout/admin'
import { Layout, SideBar } from '@/components/layout/shared'
import { DashboardMainHeader, Pagination } from '@/components/reusable/shared'
import { useAdminOrderContext } from '@/context/adminOrderContext'
import {
    AdminOrderLoading,
} from '@/types/main.types'
import { OrderCard, OrdersSearchFilterSort } from '@/components/sections/admin/orders'
import { useEffect, useState } from 'react'
import { Loader2Icon, Package, SearchX, ShoppingBag, } from 'lucide-react'
import Masonry from 'react-masonry-css'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const AdminOrdersMain = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 640px)");
    const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1024px)");
    const isLaptop = useMediaQuery("(min-width: 1024px) and (max-width: 1366px)");
    const isDesktop = useMediaQuery("(min-width: 1366px)");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const getDynamicLimit = () => {
        if (isMobile) return 4;
        if (isTablet) return 6;
        if (isLaptop) return 8;
        if (isDesktop) return 10;
        return 6;
    };
    useEffect(() => {
        const newLimit = getDynamicLimit();
        if (newLimit !== limit) {
            setLimit(Number(newLimit));
        }
    }, [isDesktop, isLaptop, isMobile, isTablet]);

    const {
        orders,
        loading,
        totalOrders
    } = useAdminOrderContext();

    const breakpointColumns = {
        default: 2,
        1280: 2,
        1024: 1,
    };

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
                            mainHeading="Manage Orders"
                            subIcon={<Package className="size-5 xsm:block hidden  text-cyan-100 dark:text-orange-100" />}
                            subText="View, process, and track all customer orders from one place."
                        />

                        <OrdersSearchFilterSort
                            limit={limit}
                            page={page}
                            setPage={setPage}
                        />

                        {
                            loading === AdminOrderLoading.GET_ALL_ORDERS ?
                                (
                                    <div className='mt-40  max-w-full'>
                                        <Loader2Icon className='size-10 block mx-auto animate-spin-faster' />
                                    </div>
                                )
                                :
                                <>

                                    {
                                        orders?.length > 0 ? (
                                            <Masonry breakpointCols={breakpointColumns} className="flex w-auto -ml-6" columnClassName="pl-6 bg-clip-padding">

                                                {
                                                    orders.map((order) => (
                                                        <OrderCard
                                                            key={order.orderId}
                                                            order={order}
                                                        />
                                                    ))
                                                }
                                            </Masonry>

                                        )
                                            : (
                                                <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-gray-900 dark:text-gray-300">
                                                    <SearchX className="size-8 text-gray-900 dark:text-gray-300" />
                                                    <h2 className="text-lg font-semibold">No Orders Found</h2>
                                                    <p className="text-sm text-muted-foreground max-w-sm">
                                                        We couldn't find any orders matching your criteria. Try adjusting your search or filters.
                                                    </p>
                                                </div>
                                            )
                                    }

                                </>
                        }

                        <Pagination
                            limit={limit}
                            page={page}
                            setPage={setPage}
                            totalProducts={totalOrders ? totalOrders : 0}
                            forOrder
                        />
                    </div>
                </Layout >
            </div >
        </>
    )
}

export default AdminOrdersMain