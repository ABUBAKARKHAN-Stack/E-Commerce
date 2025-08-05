import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types/main.types";
import { FC, JSX } from "react";
import {
  Clock,
  CheckCircle2,
  PackageSearch,
  Truck,
  PackageCheck,
  XCircle
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
  [OrderStatus.PENDING]: <Clock className="w-4 h-4 mr-1" />,
  [OrderStatus.CONFIRMED]: <CheckCircle2 className="w-4 h-4 mr-1" />,
  [OrderStatus.PROCESSING]: <PackageSearch className="w-4 h-4 mr-1" />,
  [OrderStatus.SHIPPED]: <Truck className="w-4 h-4 mr-1" />,
  [OrderStatus.DELIVERED]: <PackageCheck className="w-4 h-4 mr-1" />,
  [OrderStatus.CANCELLED]: <XCircle className="w-4 h-4 mr-1" />,
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
