import { BlurFade } from "@/components/magicui/blur-fade";
import { OrderIdBadge, OrderStatusBadge } from "@/components/reusable/user";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useFormattedDateTime from "@/hooks/useFormattedDateTime";
import { IOrder, PaymentMethod } from "@/types/main.types";
import {
  Eye,
  HelpCircle,
  MoreVertical,
  SearchSlash,
  PackageCheck,
  DollarSign,
  CalendarDays,
  CreditCard,
  Undo2,
  Truck,
} from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  totalOrders: IOrder[];
  filterError: string;
};

const OrderCard: FC<Props> = ({ totalOrders, filterError }) => {
  const { formatDate } = useFormattedDateTime();
  const navigate = useNavigate();

  return (
    <>
      {totalOrders?.length > 0 ? (
        totalOrders.map(
          (
            {
              orderId,
              cart,
              status,
              createdAt,
              paymentMethod,
              refund,
              shipping,
              paymentStatus,
            },
            i,
          ) => {
            const orderPlacedDate = new Date(createdAt);

            const dropdownItems = [
              {
                label: "View Full Order",
                icon: Eye,
                onClick: () => navigate(`/orders/${orderId}`),
              },
              {
                label: "Contact Support",
                icon: HelpCircle,
                onClick: () => navigate("/contact"),
              },
            ];

            return (
              <BlurFade
                key={orderId}
                delay={0.1 * i}
                className="bg-muted border-border relative space-y-4 rounded-xl border p-5 shadow-sm transition hover:shadow-md"
              >
                {/* Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="absolute right-5 bottom-0">
                    <Button
                      size="icon"
                      className="!bg-foreground text-white dark:text-black"
                    >
                      <MoreVertical className="size-5 stroke-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions on this order</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="space-y-1 py-1">
                      {dropdownItems.map(({ label, icon: Icon, ...item }) => (
                        <DropdownMenuItem key={label} {...item}>
                          <Icon className="mr-2 size-5" />
                          {label}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Header */}
                <div className="xxs:flex-row xxs:items-center xxs:justify-between flex flex-col items-start justify-start gap-y-2">
                  <OrderIdBadge
                    className="xxs:text-sm !mt-0 !rounded text-xs tracking-tight"
                    orderId={orderId}
                  />
                  <OrderStatusBadge orderStatus={status} />
                </div>

                {/* Details */}
                <div className="text-muted-foreground space-y-2 text-sm font-medium">
                  {/* Order Placed */}
                  <div className="flex items-center gap-2">
                    <CalendarDays className="size-4" />
                    Order Placed:
                    <span className="text-foreground ml-1 font-semibold">
                      {formatDate(orderPlacedDate)}
                    </span>
                  </div>

                  {/* Total Items */}
                  <div className="flex items-center gap-2">
                    <PackageCheck className="size-4" />
                    Total Items:
                    <span className="text-foreground ml-1 font-semibold">
                      {cart?.products?.length ?? 0}
                    </span>
                  </div>

                  {/* Total Amount */}
                  <div className="flex items-center gap-2">
                    <DollarSign className="size-4" />
                    Total Amount:
                    <span className="text-foreground ml-1 font-semibold">
                      ${cart?.totalAmount ?? "0.00"}
                    </span>
                  </div>

                  {/* Shipping */}

                  <div className="flex items-center gap-2">
                    <Truck className="size-4" />
                    Shipping:
                    <span className="text-foreground ml-1 font-semibold">
                      ${shipping}
                    </span>
                  </div>

                  {/* Payment Method */}
                  {paymentMethod && (
                    <div className="flex items-center gap-2">
                      <CreditCard className="size-4" />
                      Payment Method:
                      <span className="text-foreground ml-1 font-semibold">
                        {paymentMethod === PaymentMethod.COD
                          ? "Cash On Delivery"
                          : paymentMethod === PaymentMethod.STRIPE
                            ? "Card"
                            : "N/A"}
                      </span>
                    </div>
                  )}

                  {/* Payment Status */}
                  {paymentStatus && (
                    <div className="flex items-center gap-2">
                      <CreditCard className="size-4" />
                      Payment Status:
                      <span className="text-foreground ml-1 font-semibold capitalize">
                        {paymentStatus}
                      </span>
                    </div>
                  )}

                  {/* Refunded Amount */}
                  {refund?.refundAmount && (
                    <div className="flex items-center gap-2">
                      <Undo2 className="size-4" />
                      Refunded:
                      <span className="text-foreground ml-1 font-semibold">
                        ${refund.refundAmount}
                      </span>
                    </div>
                  )}

                  {/* Refunded On */}
                  {refund?.refundAt && (
                    <div className="flex items-center gap-2">
                      <CalendarDays className="size-4" />
                      Refunded On:
                      <span className="text-foreground ml-1 font-semibold">
                        {formatDate(new Date(refund.refundAt))}
                      </span>
                    </div>
                  )}
                </div>
              </BlurFade>
            );
          },
        )
      ) : (
        <div className="bg-muted border-border col-span-2 flex min-h-[180px] flex-col items-center justify-center space-y-3 rounded-xl border p-5 text-center shadow-sm">
          <SearchSlash className="text-muted-foreground size-9" />
          <h4 className="text-muted-foreground text-base font-semibold">
            Order Not Found
          </h4>
          <p className="text-muted-foreground text-sm">
            {filterError || "You haven't placed any orders yet."}
          </p>
        </div>
      )}
    </>
  );
};

export default OrderCard;
