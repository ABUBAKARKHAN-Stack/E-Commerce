import { Button } from "@/components/ui/button";
import { useAdminOrderContext } from "@/context/adminOrder.context";
import { AdminOrderLoading, OrderStatus } from "@/types/main.types";
import {
  CheckCheck,
  CircleArrowLeft,
  Loader2,
  Truck,
  AlertTriangle,
} from "lucide-react";
import { FC } from "react";
import { useNavigate, useRevalidator } from "react-router-dom";
import CancelOrderButtonWithDialog from "./CancelOrderButtonWithDialog";

type Props = {
  orderStatus: string;
  orderId: string;
};

const OrderActionButtons: FC<Props> = ({ orderStatus, orderId }) => {
  const {
    loading,
    markOrderAsDelivered,
    markOrderAsProcessing,
    markOrderAsShipped,
  } = useAdminOrderContext();
  const { revalidate } = useRevalidator();
  const navigate = useNavigate();

  const processingLoading = loading === AdminOrderLoading.MARK_AS_PROCESSING;
  const shippedLoading = loading === AdminOrderLoading.MARK_AS_SHIPPIED;
  const deliveredLoading = loading === AdminOrderLoading.MARK_AS_DELIVERED;

  if (
    orderStatus === OrderStatus.CANCELLED ||
    orderStatus === OrderStatus.DELIVERED
  ) {
    return (
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-end">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <CircleArrowLeft className="size-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 border-t pt-4">
      {/* Action Buttons Grid */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Mark as Processing */}
        <Button
          disabled={processingLoading || orderStatus !== OrderStatus.CONFIRMED}
          onClick={() => markOrderAsProcessing(orderId, revalidate)}
          size="lg"
          className="flex w-full items-center justify-center"
          variant={
            orderStatus === OrderStatus.CONFIRMED ? "default" : "secondary"
          }
        >
          {processingLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Loader2 className="size-4" />
          )}
          <span className="hidden sm:inline">Mark as</span> Processing
        </Button>

        {/* Mark as Shipped */}
        <Button
          disabled={shippedLoading || orderStatus !== OrderStatus.PROCESSING}
          onClick={() => markOrderAsShipped(orderId, revalidate)}
          size="lg"
          className="flex w-full items-center justify-center"
          variant={
            orderStatus === OrderStatus.PROCESSING ? "default" : "secondary"
          }
        >
          {shippedLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Truck className="size-4" />
          )}
          <span className="hidden sm:inline">Mark as</span> Shipped
        </Button>

        {/* Mark as Delivered */}
        <Button
          disabled={deliveredLoading || orderStatus !== OrderStatus.SHIPPED}
          onClick={() => markOrderAsDelivered(orderId, revalidate)}
          size="lg"
          className="flex w-full items-center justify-center"
          variant={
            orderStatus === OrderStatus.SHIPPED ? "default" : "secondary"
          }
        >
          {deliveredLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <CheckCheck className="size-4" />
          )}
          <span className="hidden sm:inline">Mark as</span> Delivered
        </Button>

        {/* Cancel Order With Dialog Which Collects order cancel reason */}
        <CancelOrderButtonWithDialog
          orderStatus={orderStatus}
          orderId={orderId}
        />
      </div>

      {/* Status Information */}
      {orderStatus === OrderStatus.PENDING && (
        <div className="mb-4 rounded-md border border-yellow-200 bg-yellow-50 p-3">
          <div className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="size-4" />
            <span className="text-sm font-medium">
              This order is currently <span className="underline">pending</span>{" "}
              and cannot be processed yet.
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <div className="text-muted-foreground order-2 text-sm sm:order-1">
          Current Status:{" "}
          <span className="font-semibold capitalize">
            {orderStatus.toLowerCase()}
          </span>
        </div>

        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          size="lg"
          className="order-1 w-full sm:order-2 sm:w-auto"
        >
          <CircleArrowLeft className="size-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default OrderActionButtons;
