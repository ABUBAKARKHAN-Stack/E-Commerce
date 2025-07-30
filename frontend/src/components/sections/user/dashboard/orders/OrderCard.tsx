import { BlurFade } from "@/components/magicui/blur-fade";
import { OrderIdBadge, OrderStatusBadge } from "@/components/reusable/user";
import { Badge } from "@/components/ui/badge";
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
import { IOrder, OrderStatus, PaymentMethod } from "@/types/main.types";
import {
    Eye,
    HelpCircle,
    LocateFixed,
    MoreVertical,
    SearchSlash,
    PackageCheck,
    DollarSign,
    CalendarDays,
    CreditCard,
    Undo2,
    Truck,
    FileDown,
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
                        { orderId, cart, status, createdAt, paymentMethod, refund, shipping, paymentStatus },
                        i
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
                                className="bg-muted rounded-xl p-5 space-y-4 border border-border shadow-sm transition hover:shadow-md relative"
                            >
                                {/* Dropdown Menu */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="absolute right-5 bottom-0">
                                        <Button size="icon" className="!bg-foreground dark:text-black text-white">
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
                                <div className="flex xxs:flex-row flex-col gap-y-2 xxs:items-center items-start justify-start xxs:justify-between">
                                    <OrderIdBadge
                                        className="!mt-0 !rounded xxs:text-sm text-xs tracking-tight"
                                        orderId={orderId}
                                    />
                                    <OrderStatusBadge orderStatus={status} />
                                </div>

                                {/* Details */}
                                <div className="space-y-2 text-sm text-muted-foreground font-medium">
                                    {/* Order Placed */}
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="size-4" />
                                        Order Placed:
                                        <span className="ml-1 font-semibold text-foreground">
                                            {formatDate(orderPlacedDate)}
                                        </span>
                                    </div>

                                    {/* Total Items */}
                                    <div className="flex items-center gap-2">
                                        <PackageCheck className="size-4" />
                                        Total Items:
                                        <span className="ml-1 font-semibold text-foreground">
                                            {cart?.products?.length ?? 0}
                                        </span>
                                    </div>

                                    {/* Total Amount */}
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="size-4" />
                                        Total Amount:
                                        <span className="ml-1 font-semibold text-foreground">
                                            ${cart?.totalAmount ?? "0.00"}
                                        </span>
                                    </div>

                                    {/* Shipping */}

                                    <div className="flex items-center gap-2">
                                        <Truck className="size-4" />
                                        Shipping:
                                        <span className="ml-1 font-semibold text-foreground">
                                            ${shipping}
                                        </span>
                                    </div>

                                    {/* Payment Method */}
                                    {paymentMethod && (
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="size-4" />
                                            Payment Method:
                                            <span className="ml-1 font-semibold text-foreground">
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
                                            <span className="ml-1 font-semibold text-foreground capitalize">
                                                {paymentStatus}
                                            </span>
                                        </div>
                                    )}

                                    {/* Refunded Amount */}
                                    {refund?.refundAmount && (
                                        <div className="flex items-center gap-2">
                                            <Undo2 className="size-4" />
                                            Refunded:
                                            <span className="ml-1 font-semibold text-foreground">
                                                ${refund.refundAmount}
                                            </span>
                                        </div>
                                    )}

                                    {/* Refunded On */}
                                    {refund?.refundAt && (
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="size-4" />
                                            Refunded On:
                                            <span className="ml-1 font-semibold text-foreground">
                                                {formatDate(new Date(refund.refundAt))}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </BlurFade>
                        );
                    }
                )
            ) : (
                <div className="bg-muted col-span-2 rounded-xl p-5 space-y-3 border border-border shadow-sm text-center flex flex-col items-center justify-center min-h-[180px]">
                    <SearchSlash className="size-9 text-muted-foreground" />
                    <h4 className="text-base font-semibold text-muted-foreground">
                        Order Not Found
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        {filterError || "You haven't placed any orders yet."}
                    </p>
                </div>
            )}
        </>
    );
};

export default OrderCard;
