import { OrderStatusBadge } from "@/components/reusable/shared";
import {
  Package,
  Clock,
  CreditCard,
  MapPin,
  User,
  Phone,
  Truck,
  Zap,
  Gift,
  CheckCircle2,
  AlertCircle,
  Mail,
  XCircle,
} from "lucide-react";
import { FC } from "react";
import {
  formatDate,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns";
import {
  IShippingAddress,
  PaymentStatus,
  Refund,
  ShippingMethod,
} from "@/types/main.types";
import OrderActionButtons from "./OrderActionButtons";

type Product = {
  name: string;
  orderedProductQuantity: number;
  price: number;
  thumbnail: string;
};

type OrderDetailsProps = {
  orderId: string;
  products: Product[];
  totalAmount: number;
  confirmedAt?: string;
  orderStatus: string;
  shippingAddress?: IShippingAddress;
  shippingMethod?: ShippingMethod;
  shipping?: number;
  paymentStatus: PaymentStatus;
  refund?: Refund;
  paymentMethod?: string;
  deliveryDate?: string;
  isDelivered?: boolean;
  orderPlaceAt: string;
  cancelledAt?: string;
};

const OrderDetails: FC<OrderDetailsProps> = ({
  orderId,
  products = [],
  totalAmount = 0,
  confirmedAt,
  orderStatus,
  shippingAddress,
  shippingMethod,
  shipping = 0,
  paymentStatus,
  refund,
  paymentMethod,
  deliveryDate,
  isDelivered,
  orderPlaceAt,
  cancelledAt,
}) => {
  const hasShippingAddress = shippingAddress && shippingAddress.fullName;
  const hasRefund =
    refund?.refundAmount && refund?.refundAt && refund?.stripeRefundId;
  const itemCount = products.length;
  const subtotal = totalAmount - shipping;
  const orderAge = formatDistanceToNowStrict(orderPlaceAt);

  const getShippingIcon = (method?: ShippingMethod) => {
    switch (method) {
      case ShippingMethod.FREE:
        return Gift;
      case ShippingMethod.EXPRESS:
        return Zap;
      default:
        return Truck;
    }
  };

  const getShippingLabel = (method?: ShippingMethod) => {
    switch (method) {
      case ShippingMethod.FREE:
        return "Free Shipping";
      case ShippingMethod.EXPRESS:
        return "Express Delivery";
      default:
        return "Standard Shipping";
    }
  };

  const ShippingIcon = getShippingIcon(shippingMethod);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      {/* Executive Header */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 px-8 py-6 dark:border-zinc-700 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 shadow-sm dark:from-gray-600 dark:to-gray-800">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Order #{orderId}
              </h1>
              <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(new Date(orderPlaceAt), "MMM dd, yyyy • hh:mm a")}
                </span>
                <span className="w-fit rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-zinc-700 dark:text-gray-400">
                  {orderAge} <span>old</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <OrderStatusBadge orderStatus={orderStatus} />
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                ${totalAmount.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Data Grid */}
        <div className="mb-8 space-y-8">
          {/* Order Items */}
          <div className="w-full">
            <div className="mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Items Ordered
              </h2>
            </div>
            <div className="space-y-3">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start gap-4 rounded-lg border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="h-14 w-14 flex-shrink-0 rounded-lg border border-gray-200 bg-white object-cover dark:border-zinc-600"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                      <span className="text-sm text-gray-500">
                        Qty: {product.orderedProductQuantity}
                      </span>
                      <span className="text-sm text-gray-500">
                        Unit: ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="self-end sm:self-center">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      $
                      {(product.price * product.orderedProductQuantity).toFixed(
                        2,
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Panel */}
          <div className="flex w-full flex-col gap-8 lg:flex-row">
            {/* Financial Summary */}
            <div className="w-full rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-zinc-700 dark:bg-zinc-800">
              <div className="mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Payment
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Shipping
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${shipping?.toFixed(2) || "N/A"}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 dark:border-zinc-600">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 border-t border-gray-200 pt-3 dark:border-zinc-600">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Method
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {paymentMethod || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Status
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          paymentStatus === PaymentStatus.PAID
                            ? "bg-green-500"
                            : paymentStatus === PaymentStatus.UNPAID
                              ? "bg-red-500"
                              : "bg-purple-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          paymentStatus === PaymentStatus.PAID
                            ? "text-green-700 dark:text-green-400"
                            : paymentStatus === PaymentStatus.UNPAID
                              ? "text-red-700 dark:text-red-400"
                              : "text-purple-700 dark:text-purple-400"
                        }`}
                      >
                        {paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            {hasShippingAddress && (
              <div className="w-full rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-zinc-700 dark:bg-zinc-800">
                <div className="mb-4 flex items-center gap-2">
                  <ShippingIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Shipping
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {getShippingLabel(shippingMethod)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 flex-shrink-0 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {shippingAddress.fullName}
                      </span>
                    </div>
                    {shippingAddress.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 flex-shrink-0 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {shippingAddress.phone}
                        </span>
                      </div>
                    )}
                    {shippingAddress.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 flex-shrink-0 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {shippingAddress.email}
                        </span>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
                      <div className="text-gray-600 dark:text-gray-400">
                        {shippingAddress.addressLine1 && (
                          <div>{shippingAddress.addressLine1}</div>
                        )}
                        {shippingAddress.addressLine2 && (
                          <div>{shippingAddress.addressLine2}</div>
                        )}
                        <div>
                          {shippingAddress.city && `${shippingAddress.city}, `}
                          {shippingAddress.state && `${shippingAddress.state} `}
                          {shippingAddress.postalCode &&
                            `${shippingAddress.postalCode}, `}
                          {shippingAddress.country}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      {isDelivered && (
                        <>
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-500" />
                          <span className="text-sm font-medium text-green-700 dark:text-green-400">
                            Delivered
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className="border-t border-gray-200 pt-8 dark:border-zinc-700">
          <div className="mb-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Order Timeline
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-lg border border-blue-200 bg-blue-50 p-4 sm:items-center dark:border-blue-800 dark:bg-blue-950/20">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                <Package className="h-4 w-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-gray-900 dark:text-white">
                  Order Placed
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(new Date(orderPlaceAt), "MMM dd, yyyy • hh:mm a")}
                </div>
              </div>
            </div>

            {confirmedAt && (
              <div className="flex items-start gap-4 rounded-lg border border-green-200 bg-green-50 p-4 sm:items-center dark:border-green-800 dark:bg-green-950/20">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-600">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    Order Confirmed
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(
                      new Date(confirmedAt),
                      "MMM dd, yyyy • hh:mm a",
                    )}
                  </div>
                </div>
              </div>
            )}
            {deliveryDate && cancelledAt && (
              <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:items-center dark:border-zinc-700 dark:bg-zinc-800/20">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-400">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    Expected Delivery (Cancelled)
                  </div>
                  <div className="text-sm text-gray-600 line-through dark:text-gray-400">
                    {formatDate(
                      new Date(deliveryDate),
                      "MMM dd, yyyy • hh:mm a",
                    )}
                  </div>
                </div>
              </div>
            )}

            {deliveryDate && !cancelledAt && (
              <div className="flex items-start gap-4 rounded-lg border border-purple-200 bg-purple-50 p-4 sm:items-center dark:border-purple-800 dark:bg-purple-950/20">
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                    isDelivered ? "bg-green-600" : "bg-purple-600"
                  }`}
                >
                  {isDelivered ? (
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  ) : (
                    <Clock className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {isDelivered ? "Delivered" : "Expected Delivery"}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(
                      new Date(deliveryDate),
                      "MMM dd, yyyy • hh:mm a",
                    )}
                  </div>
                </div>
              </div>
            )}

            {cancelledAt && (
              <div className="flex items-start gap-4 rounded-lg border border-red-200 bg-red-50 p-4 sm:items-center dark:border-red-800 dark:bg-red-950/20">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
                  <XCircle className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    Order Cancelled
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(
                      new Date(cancelledAt),
                      "MMM dd, yyyy • hh:mm a",
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Refund Alert */}
        {hasRefund && (
          <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/20">
            <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
              <div className="min-w-0 flex-1">
                <div className="font-medium text-red-800 dark:text-red-400">
                  Refund Processed
                </div>
                <div className="text-sm text-red-700 dark:text-red-500">
                  ${refund.refundAmount.toFixed(2)} •{" "}
                  {formatDate(new Date(refund.refundAt), "MMM dd, yyyy")}
                </div>
              </div>
              <div className="max-w-full truncate text-sm text-red-700 sm:text-right dark:text-red-400">
                <span className="font-medium">Stripe Refund ID:</span>{" "}
                {refund.stripeRefundId}
              </div>
            </div>
          </div>
        )}

        <OrderActionButtons orderStatus={orderStatus} orderId={orderId} />
      </div>
    </div>
  );
};

export default OrderDetails;
