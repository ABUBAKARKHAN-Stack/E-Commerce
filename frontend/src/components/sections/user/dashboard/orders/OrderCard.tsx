import { OrderIdBadge } from "@/components/reusable/user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useFormattedDateTime from "@/hooks/useFormattedDateTime";
import { isOrderCancelable } from '@/utils/IsOrderCancelable';
import { Eye, HelpCircle, LocateFixed, MoreVertical, SearchSlash, XCircle } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";


type Props = {
    totalOrders: any[];
    filterError: string
}


const OrderCard: FC<Props> = ({
    totalOrders,
    filterError
}) => {

    const { formatDate } = useFormattedDateTime();
    const navigate = useNavigate();

    return (
        <div className='space-y-6'>
            {/* Order Cards */}
            {
                totalOrders.length > 0 ? (totalOrders.map(({ orderId, cart, status, createdAt, confirmedAt }) => {
                    const orderPlacedDate = new Date(createdAt);
                    const canCanelOrder = isOrderCancelable(status, confirmedAt);
                    return (
                        <div
                            key={orderId}
                            className="bg-muted rounded-xl p-5 space-y-4 border border-border shadow-sm transition hover:shadow-md relative">

                            {/* DropDown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className='absolute right-5 bottom-0'
                                >
                                    <Button>
                                        <MoreVertical className='size-5 stroke-3' />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Actions on this order</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <div className='space-y-1 py-1'>
                                        <DropdownMenuItem
                                            onClick={() => navigate(`/order/${orderId}`)}
                                        >
                                            View Full Order <Eye className='ml-2 size-5' />
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            disabled={status === 'pending'}
                                            onClick={() => navigate(`/track-order?orderId=${orderId}`)}
                                        >
                                            Track Your Order <LocateFixed className='ml-2 size-5' />
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => navigate('/contact')}

                                        >
                                            Contact Support <HelpCircle className="size-5 ml-2" />
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            disabled={!canCanelOrder}
                                        >
                                            Cancel Order <XCircle className="size-5 ml-2" />
                                        </DropdownMenuItem>

                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className='flex items-center justify-between'>
                                {/* Order ID */}
                                <OrderIdBadge
                                    className="!mt-0 !rounded text-sm tracking-tight"
                                    orderId={orderId}
                                />
                                <Badge
                                    variant={
                                        status === "pending"
                                            ? "default"
                                            : status === "confirmed"
                                                ? "success"
                                                : "error"
                                    }
                                >
                                    {status}
                                </Badge>
                            </div>

                            {/* Items and Status */}
                            <div className="text-muted-foreground text-sm font-medium">
                                Total Items:
                                <span className="ml-1 font-semibold text-foreground">
                                    {cart.products.length}
                                </span>
                            </div>


                            {/* Total Amount */}
                            <div className="text-sm text-muted-foreground font-medium">
                                Total Amount:
                                <span className="ml-1 font-semibold text-foreground">
                                    ${cart.totalAmount}
                                </span>
                            </div>

                            {/* Order Placed Date */}
                            <div className="text-sm text-muted-foreground font-medium">
                                Order Placed:
                                <span className="ml-1 font-semibold text-foreground">
                                    {formatDate(orderPlacedDate)}
                                </span>
                            </div>
                        </div>


                    )
                })) : (
                    <div className="bg-muted rounded-xl p-5 space-y-3 border border-border shadow-sm text-center flex flex-col items-center justify-center min-h-[180px]">
                        <SearchSlash className="size-9 text-muted-foreground" />
                        <h4 className="text-base font-semibold text-muted-foreground">
                            Order Not Found
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {filterError || "You haven't placed any orders yet."}
                        </p>
                    </div>
                )
            }
        </div>

    )
}

export default OrderCard