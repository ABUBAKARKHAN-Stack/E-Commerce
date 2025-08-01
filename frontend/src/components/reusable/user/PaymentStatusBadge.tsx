import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { PaymentStatus } from "@/types/main.types";

type Props = {
  paymentStatus: string;
};

const statusVariants: Record<
  PaymentStatus,
  "default" | "error" | "info" | "warning" | "success"
> = {
  [PaymentStatus.PAID]: "success",
  [PaymentStatus.UNPAID]: "error",
  [PaymentStatus.REFUNDED]: "info",
};

const PaymentStatusBadge: FC<Props> = ({ paymentStatus }) => {
  const status = Object.values(PaymentStatus).includes(
    paymentStatus as PaymentStatus,
  )
    ? (paymentStatus as PaymentStatus)
    : PaymentStatus.UNPAID;

  return (
    <Badge variant={statusVariants[status]}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  );
};

export default PaymentStatusBadge;
