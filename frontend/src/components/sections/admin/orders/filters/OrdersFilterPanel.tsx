import { Dispatch, FC, SetStateAction } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AdminOrderFiltersType } from "@/types/main.types";
import { XIcon } from "lucide-react";
import OrderSortBySelector from "./OrderSortBySelector";
import OrderStatusFilter from "./OrderStatusFilter";
import PaymentStatusFilter from "./PaymentStatusFilter";
import PaymentMethodFilter from "./PaymentMethodFilter";
import ShippingMethodFilter from "./ShippingMethodFilter";
import ApplyFiltersRemoveButtons from "./ApplyFiltersRemoveButtons";

type Props = {
  isFilterPanelOpen: boolean;
  setIsFilterPanelOpen: Dispatch<SetStateAction<boolean>>;
  filterCount: number;
  filters: AdminOrderFiltersType;
  setFilters: Dispatch<SetStateAction<AdminOrderFiltersType>>;
  onFilterApply: () => void;
  onFilterRemove: () => void;
};

const OrdersFilterPanel: FC<Props> = ({
  isFilterPanelOpen,
  setIsFilterPanelOpen,
  filterCount,
  filters,
  setFilters,
  onFilterApply,
  onFilterRemove,
}) => {
  return (
    <AnimatePresence>
      {isFilterPanelOpen && (
        <div className="absolute right-0 z-20 max-w-lg overflow-hidden">
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="scrollbar-thin md:scrollbar scrollbar-corner-white dark:scrollbar-thumb-orange-500 scrollbar-thumb-cyan-500 scrollbar-track-transparent h-full max-h-96 w-full space-y-6 overflow-y-auto rounded-lg border-2 border-cyan-500 bg-[#f8f7f7]/80 p-5 shadow-xl backdrop-blur-xl dark:border-orange-500 dark:bg-[#18181b]/80"
          >
            {/* Panel Header */}
            <div className="flex w-full items-center justify-between">
              <h1 className="text-xl font-bold tracking-wide text-gray-950 dark:text-white">
                Filter/Sort Orders
              </h1>
              <Button
                size={"icon"}
                variant={"default"}
                onClick={() => setIsFilterPanelOpen(false)}
              >
                <XIcon className="size-5" />
              </Button>
            </div>

            <Separator className="mt-2 border-[1.5px]" />

            <div className="space-y-6">
              {/* Filter By Status */}
              <OrderStatusFilter filters={filters} setFilters={setFilters} />

              {/* Filter By Payment Status */}
              <PaymentStatusFilter filters={filters} setFilters={setFilters} />

              {/* Filter By Payment Method */}
              <PaymentMethodFilter filters={filters} setFilters={setFilters} />

              {/* Filter By Shipping Method */}
              <ShippingMethodFilter filters={filters} setFilters={setFilters} />

              {/* Sort Orders */}
              <OrderSortBySelector filters={filters} setFilters={setFilters} />
            </div>

            {/* Apply/Reset Filters Buttons */}
            <ApplyFiltersRemoveButtons
              filterCount={filterCount}
              onFilterApply={onFilterApply}
              onFilterRemove={onFilterRemove}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrdersFilterPanel;
