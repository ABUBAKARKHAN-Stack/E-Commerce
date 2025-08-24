import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types/main.types";
import { FC, JSX } from "react";
import {
  Clock,
  CheckCircle2,
  PackageSearch,
  Truck,
  PackageCheck,
  XCircle,
} from "lucide-react";

type Props = {
  orderStatus: string;
};

const statusVariants: Record<
  OrderStatus,
  "default" | "error" | "info" | "warning" | "success"
> = {
  [OrderStatus.PENDING]: "warning",
  [OrderStatus.CONFIRMED]: "info",
  [OrderStatus.PROCESSING]: "info",
  [OrderStatus.SHIPPED]: "default",
  [OrderStatus.DELIVERED]: "success",
  [OrderStatus.CANCELLED]: "error",
};

const statusIcons: Record<OrderStatus, JSX.Element> = {
  [OrderStatus.PENDING]: <Clock className="mr-1 h-4 w-4" />,
  [OrderStatus.CONFIRMED]: <CheckCircle2 className="mr-1 h-4 w-4" />,
  [OrderStatus.PROCESSING]: <PackageSearch className="mr-1 h-4 w-4" />,
  [OrderStatus.SHIPPED]: <Truck className="mr-1 h-4 w-4" />,
  [OrderStatus.DELIVERED]: <PackageCheck className="mr-1 h-4 w-4" />,
  [OrderStatus.CANCELLED]: <XCircle className="mr-1 h-4 w-4" />,
};

const OrderStatusBadge: FC<Props> = ({ orderStatus }) => {
  const status = Object.values(OrderStatus).includes(orderStatus as OrderStatus)
    ? (orderStatus as OrderStatus)
    : OrderStatus.PENDING;

  return (
    <Badge variant={statusVariants[status]} className="flex items-center gap-1">
      {statusIcons[status]}
      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    </Badge>
  );
};

export default OrderStatusBadge;
