import { useAdminOrderContext } from "@/context/adminOrder.context";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import OrdersFilterPanel from "./filters/OrdersFilterPanel";
import { AdminOrderFiltersType } from "@/types/main.types";
import SearchBar from "./filters/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";
import FilterPanelTriggerButton from "./filters/FilterPanelTriggerButton";

type Props = {
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const OrdersSearchFilterSort: FC<Props> = ({ limit, page, setPage }) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState<AdminOrderFiltersType>({
    status: "",
    paymentMethod: "",
    paymentStatus: "",
    shippingMethod: "",
    sortBy: "",
    searchOrderByCustomerName: "",
  });

  const debouncedSearchOrderByCustomerName = useDebounce(
    filters.searchOrderByCustomerName || "",
    300,
  );
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasRestoredFilters, setHasRestoredFilters] = useState(false);

  const [filterCount, setFilterCount] = useState(0);

  const { getAllOrders, orders } = useAdminOrderContext();

  useEffect(() => {
    const stored = localStorage.getItem("adminOrdersFilter/Sort");
    try {
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Object.values(parsed).length > 0) {
          setFilters({ ...parsed, searchOrderByCustomerName: "" });
          getAllOrders({ ...parsed, limit, page });
        } else {
          getAllOrders({ limit, page });
        }
      } else {
        getAllOrders({ limit, page });
      }
    } catch (error) {
      console.error("Invalid JSON in localStorage", error);
      localStorage.removeItem("adminOrdersFilter/Sort");
      getAllOrders({ limit, page });
    }
    setHasLoaded(true);
    setHasRestoredFilters(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded || !hasRestoredFilters) return;
    const params = {
      ...filters,
      customerName: debouncedSearchOrderByCustomerName,
    };
    getAllOrders({ ...params, limit, page });
  }, [page, limit, hasRestoredFilters]);

  useEffect(() => {
    if (!hasLoaded) return;

    const params = {
      ...filters,
      customerName: debouncedSearchOrderByCustomerName,
    };

    const { customerName, ...filtersOnly } = params;
    localStorage.setItem("adminOrdersFilter/Sort", JSON.stringify(filtersOnly));

    setPage(1);
    getAllOrders({ ...params, limit, page: 1 });
  }, [debouncedSearchOrderByCustomerName]);

  useEffect(() => {
    const listener = () => {
      setPage(1);
      const params = {
        ...filters,
        customerName: "",
      };
      getAllOrders({ ...params, limit, page: 1 });
    };
    window.addEventListener("clearCustomerSearch", listener);
    return () => window.removeEventListener("clearCustomerSearch", listener);
  }, [filters]);

  useEffect(() => {
    let count = 0;
    if (filters.status) count++;
    if (filters.paymentStatus) count++;
    if (filters.paymentMethod) count++;
    if (filters.shippingMethod) count++;
    if (filters.sortBy) count++;
    setFilterCount(count);
  }, [
    filters.status,
    filters.paymentMethod,
    filters.paymentStatus,
    filters.shippingMethod,
    filters.sortBy,
  ]);

  const queryParams = useMemo(() => {
    const params: any = {};
    if (filters.status) params.status = filters.status;
    if (filters.paymentMethod) params.paymentMethod = filters.paymentMethod;
    if (filters.paymentStatus) params.paymentStatus = filters.paymentStatus;
    if (filters.shippingMethod) params.shippingMethod = filters.shippingMethod;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (debouncedSearchOrderByCustomerName)
      params.customerName = debouncedSearchOrderByCustomerName;
    return params;
  }, [
    filters.status,
    filters.paymentMethod,
    filters.paymentStatus,
    filters.shippingMethod,
    filters.sortBy,
    debouncedSearchOrderByCustomerName,
  ]);

  const onFilterApply = () => {
    const newQueryParams = { ...queryParams };

    if (filters.searchOrderByCustomerName?.trim()) {
      newQueryParams.customerName = filters.searchOrderByCustomerName.trim();
    }

    setPage(1);
    getAllOrders({ ...newQueryParams, page: 1, limit });

    const { customerName, ...filtersOnly } = newQueryParams;
    localStorage.setItem("adminOrdersFilter/Sort", JSON.stringify(filtersOnly));
  };

  const onFilterRemove = () => {
    const resetFilters: AdminOrderFiltersType = {
      status: "",
      paymentMethod: "",
      paymentStatus: "",
      shippingMethod: "",
      sortBy: "",
      searchOrderByCustomerName: "",
    };
    setFilters(resetFilters);
    setPage(1);
    getAllOrders({ page: 1, limit });
    localStorage.removeItem("adminOrdersFilter/Sort");
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between">
        <SearchBar
          setSearchOrderByCustomerName={setFilters}
          searchOrderByCustomerName={filters.searchOrderByCustomerName || ""}
          orders={orders}
        />
        <FilterPanelTriggerButton
          setIsFilterPanelOpen={setIsFilterPanelOpen}
          filterCount={filterCount}
        />
      </div>
      <OrdersFilterPanel
        filterCount={filterCount}
        filters={filters}
        setFilters={setFilters}
        onFilterApply={onFilterApply}
        onFilterRemove={onFilterRemove}
        isFilterPanelOpen={isFilterPanelOpen}
        setIsFilterPanelOpen={setIsFilterPanelOpen}
      />
    </div>
  );
};

export default OrdersSearchFilterSort;
