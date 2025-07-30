import {
    CalendarCheck2,
    CreditCard,
    DollarSign,
    Mail,
    MapPin,
    PackageCheck,
    PackageX,
    Phone,
    Truck,
    Undo2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { OrderIdBadge, OrderStatusBadge, PaymentStatusBadge } from "@/components/reusable/user";
import { FC } from "react";
import useFormattedDateTime from "@/hooks/useFormattedDateTime";
import { IShippingAddress, OrderedProduct, PaymentMethod } from "@/types/main.types";



type Props = {
    products: OrderedProduct[];
    orderId: string;
    totalAmount: number;
    orderPlaceAt: Date;
    confirmedAt: Date;
    orderStatus: string;
    shippingAddress: IShippingAddress;
    shippingMethod: string;
    shipping: number;
    paymentStatus: string;
    refund: {
        refundAmount?: number;
        refundAt?: Date | string;
        stripeRefundId?: string;
    } | null;
    paymentMethod: string;
    isDelivered: boolean;
};

const OrderDetails: FC<Props> = ({
    confirmedAt,
    isDelivered,
    orderId,
    orderStatus,
    paymentMethod,
    paymentStatus,
    products = [],
    refund = null,
    shipping = 0,
    shippingAddress,
    shippingMethod,
    orderPlaceAt,
    totalAmount,
}) => {
    const { formatDate, formatTime } = useFormattedDateTime();

    return (
        <div className="space-y-6">
            {/* Order Summary Header */}
            <div className="bg-muted p-4 rounded-lg border border-border shadow-sm">
                <div className="flex items-center justify-between flex-wrap">
                    <OrderIdBadge orderId={orderId} className="!mt-0 !text-xs" />
                    <div className="flex items-center gap-2">
                        <OrderStatusBadge orderStatus={orderStatus} />
                        {paymentStatus && <PaymentStatusBadge paymentStatus={paymentStatus} />}
                    </div>
                </div>
            </div>

            <Separator />

            {/* Shipping Info */}
            <div className="bg-muted p-4 rounded-lg border border-border shadow-sm">
                <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Shipping Information
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                        <p className="font-medium text-foreground mb-1">Recipient:</p>
                        <p><span className="font-medium text-foreground">Name:</span> {shippingAddress?.fullName ?? "N/A"}</p>
                        <p><span className="font-medium text-foreground">Address Line 1:</span> {shippingAddress?.addressLine1 ?? "N/A"}</p>
                        {shippingAddress?.addressLine2 && (
                            <p><span className="font-medium text-foreground">Address Line 2:</span> {shippingAddress.addressLine2}</p>
                        )}
                        {shippingAddress?.city && (
                            <p><span className="font-medium text-foreground">City:</span> {shippingAddress.city}</p>
                        )}
                        {shippingAddress?.state && (
                            <p><span className="font-medium text-foreground">State:</span> {shippingAddress.state}</p>
                        )}
                        {shippingAddress?.postalCode && (
                            <p><span className="font-medium text-foreground">Postal Code:</span> {shippingAddress.postalCode}</p>
                        )}
                        <p><span className="font-medium text-foreground">Country:</span> {shippingAddress?.country ?? "N/A"}</p>
                        {shippingAddress?.phone && (
                            <p className="mt-1 flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                <span className="font-medium text-foreground">Phone:</span> {shippingAddress.phone}
                            </p>
                        )}
                        {shippingAddress?.email && (
                            <p className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                <span className="font-medium text-foreground">Email:</span> {shippingAddress.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-foreground mb-1 flex items-center gap-1">
                            <Truck className="w-4 h-4" /> Shipping Method:
                        </p>
                        <p><span className="font-medium text-foreground">Method:</span> {shippingMethod || "N/A"}</p>
                        <p className="mt-1 font-medium text-foreground">
                            Shipping Cost: <span className="font-semibold">${shipping}</span>
                        </p>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Payment Info */}
            <div className="bg-muted p-4 rounded-lg border border-border shadow-sm">
                <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Payment Details
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                        <p className="font-medium text-foreground mb-1">Payment Method:</p>
                        <p>
                            {paymentMethod === PaymentMethod.COD
                                ? "Cash On Delivery"
                                : paymentMethod === PaymentMethod.STRIPE
                                    ? "Card"
                                    : "N/A"}
                        </p>
                    </div>
                    {refund?.refundAmount && refund?.refundAt && refund?.stripeRefundId && (
                        <div>
                            <p className="font-medium text-foreground mb-1 flex items-center gap-1">
                                <Undo2 className="w-4 h-4" /> Refund Details:
                            </p>
                            <p>Amount: <span className="text-foreground font-semibold">${refund.refundAmount}</span></p>
                            <p>Refunded At: <span className="text-foreground font-medium">{formatDate(new Date(refund.refundAt))}</span></p>
                            <p>Refund ID: <span className="text-foreground">{refund.stripeRefundId}</span></p>
                        </div>
                    )}
                </div>
            </div>

            <Separator />

            {/* Order Timeline */}
            <div className="bg-muted p-4 rounded-lg border border-border shadow-sm text-sm text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground mb-1 flex items-center gap-1">
                    <CalendarCheck2 className="w-4 h-4" /> Order Timeline
                </p>
                <p className="flex items-center gap-1">
                    Order Placed: <span className="text-foreground font-medium">
                        {formatDate(new Date(orderPlaceAt))} - {formatTime(new Date(orderPlaceAt))}
                    </span>
                </p>
                {
                    confirmedAt && (<p className="flex items-center gap-1">
                        Confirmed At: <span className="text-foreground font-medium">
                            {formatDate(new Date(confirmedAt))} - {formatTime(new Date(confirmedAt))}
                        </span>
                    </p>)
                }
                <p className="flex items-center gap-1">
                    {isDelivered ? (
                        <>
                            <PackageCheck className="w-4 h-4 text-green-600" /> Delivered: <span className="text-foreground font-medium">Yes</span>
                        </>
                    ) : (
                        <>
                            <PackageX className="w-4 h-4 text-red-600" /> Delivered: <span className="text-foreground font-medium">No</span>
                        </>
                    )}
                </p>
            </div>

            <Separator />

            {/* Ordered Items */}
            <div className="bg-muted p-4 rounded-lg border border-border shadow-sm text-sm text-muted-foreground">
                <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <PackageCheck className="w-4 h-4" /> Ordered Items
                </p>
                <ul className="space-y-4">
                    {products?.length > 0 ? products.map((product, index) => (
                        <li key={index} className="flex items-center gap-4">
                            {product.thumbnail && (
                                <div className="size-20 rounded-md border bg-white p-1">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.name}
                                        className="size-full object-cover rounded"
                                    />
                                </div>
                            )}
                            <div className="space-y-1">
                                <p className="text-foreground font-medium">{product.name}</p>
                                <p>Quantity: <span className="font-semibold text-foreground">{product.orderedProductQuantity}</span></p>
                                <p>Price: <span className="font-semibold text-foreground">${product.price}</span></p>
                            </div>
                        </li>
                    )) : (
                        <li className="text-foreground">No items ordered.</li>
                    )}
                </ul>
                <p className="mt-4 flex items-center gap-1 text-foreground">
                    <DollarSign className="w-4 h-4" /> Total Amount:{" "}
                    <span className="font-semibold">${totalAmount}</span>
                </p>
            </div>
        </div>
    );
};

export default OrderDetails;
