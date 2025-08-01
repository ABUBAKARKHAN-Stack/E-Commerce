import { DashboardSectionHeader } from "@/components/reusable/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { trackOrderSchema } from "@/schemas/track-orderSchema";
import { Clock, Filter, List, Search } from "lucide-react";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";

type Props = {
  status: string;
  sortBy: string;
  setStatus: Dispatch<SetStateAction<string>>;
  setOrderId: Dispatch<SetStateAction<string>>;
  setSortBy: Dispatch<SetStateAction<string>>;
  totalOrders: any[];
  setFilterError: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
  error: string;
};

const OrderFilterPanel: FC<Props> = ({
  status,
  sortBy,
  setOrderId,
  setSortBy,
  setStatus,
  totalOrders,
  setFilterError,
  setError,
  error,
}) => {
  const [orderIdLocally, setOrderIdLocally] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const result = trackOrderSchema.shape.orderId.safeParse(value);

    setOrderIdLocally(value);

    if (!result.success) {
      setError(result.error.errors[0].message);
      setOrderId("");
    } else {
      setError("");
    }
  };

  const sortByOptions = [
    {
      label: (
        <div className="flex items-center gap-x-1">
          <Clock className="size-4.5 stroke-3" />
          <span>Date</span>
        </div>
      ),
      options: [
        { value: "newest", label: "Newest", group: "date" },
        { value: "oldest", label: "Oldest", group: "date" },
      ],
    },
  ];

  const statusOptions = [
    {
      label: (
        <div className="flex items-center gap-x-1">
          <List className="size-4.5 stroke-3" />
          <span>Order Status</span>
        </div>
      ),
      options: [
        { value: "pending", label: "Pending", group: "status" },
        { value: "confirmed", label: "Confirmed", group: "status" },
        { value: "cancelled", label: "Cancelled", group: "status" },
        { value: "processing", label: "Processing", group: "status" },
        { value: "shippied", label: "Shipped", group: "status" },
        { value: "delivered", label: "Delivered", group: "status" },
      ],
    },
  ];

  const handleSearchOrder = () => {
    if (!orderIdLocally || error) return;

    setStatus("");
    setSortBy("newest");
    setOrderId(orderIdLocally);

    const found = totalOrders.find((o) => o.orderId === orderIdLocally.trim());

    if (!found) {
      setFilterError(`No order found with ID: ${orderIdLocally}`);
    } else {
      setFilterError("");
    }
  };

  const handleStatusChange = (value: string) => {
    setOrderId("");
    setOrderIdLocally("");
    setStatus(value);

    const filtered = totalOrders.filter((o) => o.status === value);
    setFilterError(
      filtered.length === 0 ? `No orders found with status "${value}"` : "",
    );
  };

  return (
    <div className="space-y-6">
      <DashboardSectionHeader
        mainHeading="Order Filters & Search"
        mainIcon={<Filter className="size-8 stroke-[2.5]" />}
        animateClassName=""
      />
      <div className="flex flex-col justify-between gap-6 md:flex-row">
        {/* Search Input */}
        <div className="relative w-full md:w-[40%]">
          <div className="relative">
            <Input
              name="orderId"
              placeholder="Search Order By Order Id"
              onChange={handleChange}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              value={orderIdLocally}
              className="w-full"
            />
            <Button
              onClick={handleSearchOrder}
              disabled={!orderIdLocally || !!error}
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2"
            >
              <Search className="text-muted-foreground" />
            </Button>
          </div>
          {(isFocus || orderIdLocally) && error && (
            <span className="text-destructive-foreground mt-2 block text-xs font-medium">
              {error}
            </span>
          )}
        </div>

        {/* Status & Sort Filters */}
        <div className="mb-6 flex w-full gap-2 md:mb-0 md:w-[60%]">
          <div className="relative z-10 w-full">
            <Select
              onChange={handleStatusChange}
              value={status}
              options={statusOptions}
              placeholder="Filter by status"
              className="absolute w-full"
            />
          </div>
          <div className="relative z-10 w-full">
            <Select
              onChange={(value) => setSortBy(value)}
              value={sortBy}
              options={sortByOptions}
              placeholder="Sort by"
              className="absolute w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFilterPanel;
