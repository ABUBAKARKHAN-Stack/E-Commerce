import { OrderStatusBadge, ToolTip } from "@/components/reusable/shared";
import { IOrder } from "@/types/main.types";
import { formatDate } from "date-fns";
import { Calendar, CreditCard, Eye, MapPin, Package, User } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

type OrderCardProps = {
  order: IOrder;
};

const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const navigate = useNavigate();

  const {
    orderId,
    status,
    cart,
    createdAt,
    paymentStatus,
    confirmedAt,
    paymentMethod,
    refund,
    deliveryDate,
    shippingAddress,
  } = order;

  const handleViewOrder = () => {
    navigate(`/admin/orders/${orderId}`);
  };

  const hasShippingAddress = shippingAddress && shippingAddress.fullName;
  const hasRefund = refund?.refundAmount && refund?.refundAt;
  const displayPaymentMethod = paymentMethod || "N/A";
  const itemCount = cart?.products?.length || 0;
  const totalAmount = cart?.totalAmount || 0;

  return (
    <div className="group xxxs:rounded-2xl xxxs:p-6 xxxs:mb-6 relative mb-4 break-inside-avoid overflow-hidden rounded-xl border border-gray-50 bg-white p-4 transition-all duration-500 hover:border-gray-100 hover:shadow-2xl hover:shadow-blue-500/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      {/* Refined gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-indigo-50/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-blue-950/5 dark:via-transparent dark:to-indigo-950/5" />

      {/* Header */}
      <div className="xxxs:flex-row xxxs:items-start xxxs:justify-between xxxs:gap-0 relative mb-6 flex flex-col gap-4">
        <div className="xxxs:gap-4 flex items-center gap-3">
          <div className="relative">
            <div className="xxxs:w-11 xxxs:h-11 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 dark:from-blue-400 dark:to-indigo-500 dark:shadow-blue-400/10">
              <Package className="xxxs:w-5 xxxs:h-5 h-4 w-4 text-white" />
            </div>
            <div className="xxxs:w-3 xxxs:h-3 absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-900" />
          </div>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h3 className="xxxs:text-lg text-base font-semibold tracking-tight text-gray-900 dark:text-white">
                #{orderId}
              </h3>
              <ToolTip
                triggerValue={
                  <button
                    onClick={handleViewOrder}
                    className="xxxs:p-1.5 transform cursor-pointer rounded-xl p-1 text-gray-400 transition-all duration-300 hover:scale-105 hover:bg-cyan-50 hover:text-cyan-600 dark:hover:bg-orange-900/20 dark:hover:text-orange-400"
                  >
                    <Eye className="xxxs:w-4 xxxs:h-4 h-3.5 w-3.5" />
                  </button>
                }
                tooltip="View order details"
              />
            </div>
            <p className="xxxs:text-sm text-xs font-medium text-gray-500 dark:text-gray-400">
              {formatDate(new Date(createdAt), "MMM dd, yyyy • hh:mm a")}
            </p>
          </div>
        </div>
        <div className="xxxs:flex-col xxxs:items-end xxxs:justify-start xxxs:gap-3 flex flex-row items-start justify-between gap-2">
          <OrderStatusBadge orderStatus={status} />
          <div className="text-right">
            <span className="xxxs:text-2xl text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              ${totalAmount.toFixed(2)}
            </span>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              {itemCount} item{itemCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="xsm:grid-cols-2 relative mb-6 grid grid-cols-1 gap-6">
        {/* Customer Section */}
        {hasShippingAddress && (
          <div className="space-y-4">
            <h4 className="xxxs:tracking-widest text-xs font-bold tracking-wider text-gray-400 uppercase dark:text-gray-500">
              Customer
            </h4>
            <div className="xxxs:space-y-3 space-y-2">
              <div className="xxxs:gap-3 flex items-center gap-2">
                <div className="xxxs:w-8 xxxs:h-8 xxxs:rounded-xl flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 dark:bg-zinc-800">
                  <User className="xxxs:w-4 xxxs:h-4 h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="xxxs:text-sm text-xs font-medium text-gray-900 dark:text-white">
                  {shippingAddress.fullName}
                </span>
              </div>
              {shippingAddress.city && shippingAddress.country && (
                <div className="xxxs:gap-3 flex items-center gap-2">
                  <div className="xxxs:w-8 xxxs:h-8 xxxs:rounded-xl flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 dark:bg-zinc-800">
                    <MapPin className="xxxs:w-4 xxxs:h-4 h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span className="xxxs:text-sm text-xs text-gray-600 dark:text-gray-400">
                    {shippingAddress.city}, {shippingAddress.country}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment Section */}
        <div className="space-y-4">
          <h4 className="xxxs:tracking-widest text-xs font-bold tracking-wider text-gray-400 uppercase dark:text-gray-500">
            Payment
          </h4>
          <div className="xxxs:space-y-3 space-y-2">
            <div className="xxxs:gap-3 flex items-center gap-2">
              <div className="xxxs:w-8 xxxs:h-8 xxxs:rounded-xl flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 dark:bg-zinc-800">
                <CreditCard className="xxxs:w-4 xxxs:h-4 h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
              </div>
              <span className="xxxs:text-sm text-xs font-medium text-gray-900 dark:text-white">
                {displayPaymentMethod}
              </span>
            </div>
            <div className="xxxs:gap-3 flex items-center gap-2">
              <div className="xxxs:w-8 xxxs:h-8 flex h-7 w-7 items-center justify-center">
                <div
                  className={`xxxs:w-3 xxxs:h-3 h-2.5 w-2.5 rounded-full ${
                    paymentStatus === "PAID"
                      ? "bg-green-500"
                      : paymentStatus === "UNPAID"
                        ? "bg-red-500"
                        : paymentStatus === "REFUNDED"
                          ? "bg-purple-500"
                          : "bg-gray-500"
                  }`}
                />
              </div>
              <span
                className={`xxxs:text-sm text-xs font-semibold ${
                  paymentStatus === "PAID"
                    ? "text-green-600 dark:text-green-400"
                    : paymentStatus === "UNPAID"
                      ? "text-red-600 dark:text-red-400"
                      : paymentStatus === "REFUNDED"
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {paymentStatus.charAt(0).toUpperCase() +
                  paymentStatus.slice(1).toLowerCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Footer */}
      {(confirmedAt || deliveryDate) && (
        <div className="relative border-t border-gray-50 pt-4 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="xxxs:flex-row xxxs:items-center xxxs:gap-6 flex flex-col gap-3">
              {confirmedAt && (
                <div className="xxxs:gap-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <div className="xxxs:w-2 xxxs:h-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>
                    Confirmed {formatDate(new Date(confirmedAt), "MMM dd")}
                  </span>
                </div>
              )}
              {deliveryDate && (
                <div className="xxxs:gap-2 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <Calendar className="xxxs:w-3 xxxs:h-3 h-2.5 w-2.5" />
                  <span>
                    Delivery {formatDate(new Date(deliveryDate), "MMM dd")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Refund Alert */}
      {hasRefund && (
        <div className="xxxs:mt-4 xxxs:p-4 xxxs:rounded-2xl relative mt-3 rounded-xl border border-red-100 bg-gradient-to-r from-red-50 to-rose-50 p-3 dark:border-red-800/30 dark:from-red-950/20 dark:to-rose-950/10">
          <div className="xxxs:gap-3 xxxs:text-sm flex items-center gap-2 text-xs">
            <div className="xxxs:w-6 xxxs:h-6 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500">
              <div className="xxxs:w-2 xxxs:h-2 h-1.5 w-1.5 rounded-full bg-white" />
            </div>
            <div className="font-medium text-red-700 dark:text-red-400">
              <span className="font-bold">Refunded:</span> $
              {refund.refundAmount!.toFixed(2)} •{" "}
              {formatDate(new Date(refund.refundAt!), "MMM dd, yyyy")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
