import { Dispatch, FC, SetStateAction } from 'react'
import {
    AnimatePresence,
    motion
} from 'motion/react'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    AdminOrderFiltersType,
} from '@/types/main.types'
import {
    XIcon
} from 'lucide-react'
import OrderSortBySelector from './OrderSortBySelector';
import OrderStatusFilter from './OrderStatusFilter';
import PaymentStatusFilter from './PaymentStatusFilter';
import PaymentMethodFilter from './PaymentMethodFilter';
import ShippingMethodFilter from './ShippingMethodFilter';
import ApplyFiltersRemoveButtons from './ApplyFiltersRemoveButtons';

type Props = {
    isFilterPanelOpen: boolean;
    setIsFilterPanelOpen: Dispatch<SetStateAction<boolean>>;
    filterCount: number;
    filters: AdminOrderFiltersType;
    setFilters: Dispatch<SetStateAction<AdminOrderFiltersType>>;
    onFilterApply: () => void;
    onFilterRemove: () => void;
}

const OrdersFilterPanel: FC<Props> = ({
    isFilterPanelOpen,
    setIsFilterPanelOpen,
    filterCount,
    filters,
    setFilters,
    onFilterApply,
    onFilterRemove
}) => {


    return (
        <AnimatePresence>

            {
                isFilterPanelOpen && (
                    <div
                        className='max-w-lg absolute z-20 right-0 overflow-hidden'>
                        <motion.div
                            initial={{ x: 300, opacity: 0, }}
                            animate={{ x: 0, opacity: 1, }}
                            exit={{ x: 300, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className='scrollbar-thin md:scrollbar scrollbar-corner-white dark:scrollbar-thumb-orange-500 scrollbar-thumb-cyan-500 scrollbar-track-transparent w-full max-h-96 overflow-y-auto h-full dark:bg-[#18181b]/80 backdrop-blur-xl shadow-xl bg-[#f8f7f7]/80 border-2 dark:border-orange-500 border-cyan-500 rounded-lg p-5 space-y-6'>
                                
                            {/* Panel Header */}
                            <div className='w-full flex justify-between items-center'>
                                <h1 className='text-xl dark:text-white text-gray-950 tracking-wide font-bold'>Filter/Sort Orders</h1>
                                <Button
                                    size={"icon"}
                                    variant={"default"}
                                    onClick={() => setIsFilterPanelOpen(false)}
                                >
                                    <XIcon
                                        className='size-5'
                                    />
                                </Button>
                            </div>
                            
                            <Separator className='mt-2 border-[1.5px]' />

                            <div className='space-y-6'>

                                {/* Filter By Status */}
                                <OrderStatusFilter
                                    filters={filters}
                                    setFilters={setFilters}
                                />

                                {/* Filter By Payment Status */}
                                <PaymentStatusFilter
                                    filters={filters}
                                    setFilters={setFilters}
                                />

                                {/* Filter By Payment Method */}
                                <PaymentMethodFilter
                                    filters={filters}
                                    setFilters={setFilters}
                                />

                                {/* Filter By Shipping Method */}
                                <ShippingMethodFilter
                                    filters={filters}
                                    setFilters={setFilters}
                                />

                                {/* Sort Orders */}
                                <OrderSortBySelector
                                    filters={filters}
                                    setFilters={setFilters}
                                />

                            </div>

                            {/* Apply/Reset Filters Buttons */}
                            <ApplyFiltersRemoveButtons
                                filterCount={filterCount}
                                onFilterApply={onFilterApply}
                                onFilterRemove={onFilterRemove}
                            />

                        </motion.div>
                    </div>
                )
            }
        </AnimatePresence>
    )
}

export default OrdersFilterPanel