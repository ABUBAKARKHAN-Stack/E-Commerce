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
import {
  OrderIdBadge,
  OrderStatusBadge,
  PaymentStatusBadge,
} from "@/components/reusable/user";
import { FC } from "react";
import useFormattedDateTime from "@/hooks/useFormattedDateTime";
import {
  IShippingAddress,
  OrderedProduct,
  PaymentMethod,
} from "@/types/main.types";

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
      <div className="bg-muted border-border rounded-lg border p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between">
          <OrderIdBadge orderId={orderId} className="!mt-0 !text-xs" />
          <div className="flex items-center gap-2">
            <OrderStatusBadge orderStatus={orderStatus} />
            {paymentStatus && (
              <PaymentStatusBadge paymentStatus={paymentStatus} />
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Shipping Info */}
      <div className="bg-muted border-border rounded-lg border p-4 shadow-sm">
        <p className="text-foreground mb-2 flex items-center gap-2 text-sm font-semibold">
          <MapPin className="h-4 w-4" /> Shipping Information
        </p>
        <div className="text-muted-foreground grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-foreground mb-1 font-medium">Recipient:</p>
            <p>
              <span className="text-foreground font-medium">Name:</span>{" "}
              {shippingAddress?.fullName ?? "N/A"}
            </p>
            <p>
              <span className="text-foreground font-medium">
                Address Line 1:
              </span>{" "}
              {shippingAddress?.addressLine1 ?? "N/A"}
            </p>
            {shippingAddress?.addressLine2 && (
              <p>
                <span className="text-foreground font-medium">
                  Address Line 2:
                </span>{" "}
                {shippingAddress.addressLine2}
              </p>
            )}
            {shippingAddress?.city && (
              <p>
                <span className="text-foreground font-medium">City:</span>{" "}
                {shippingAddress.city}
              </p>
            )}
            {shippingAddress?.state && (
              <p>
                <span className="text-foreground font-medium">State:</span>{" "}
                {shippingAddress.state}
              </p>
            )}
            {shippingAddress?.postalCode && (
              <p>
                <span className="text-foreground font-medium">
                  Postal Code:
                </span>{" "}
                {shippingAddress.postalCode}
              </p>
            )}
            <p>
              <span className="text-foreground font-medium">Country:</span>{" "}
              {shippingAddress?.country ?? "N/A"}
            </p>
            {shippingAddress?.phone && (
              <p className="mt-1 flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span className="text-foreground font-medium">Phone:</span>{" "}
                {shippingAddress.phone}
              </p>
            )}
            {shippingAddress?.email && (
              <p className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span className="text-foreground font-medium">Email:</span>{" "}
                {shippingAddress.email}
              </p>
            )}
          </div>
          <div>
            <p className="text-foreground mb-1 flex items-center gap-1 font-medium">
              <Truck className="h-4 w-4" /> Shipping Method:
            </p>
            <p>
              <span className="text-foreground font-medium">Method:</span>{" "}
              {shippingMethod || "N/A"}
            </p>
            <p className="text-foreground mt-1 font-medium">
              Shipping Cost: <span className="font-semibold">${shipping}</span>
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Payment Info */}
      <div className="bg-muted border-border rounded-lg border p-4 shadow-sm">
        <p className="text-foreground mb-2 flex items-center gap-2 text-sm font-semibold">
          <CreditCard className="h-4 w-4" /> Payment Details
        </p>
        <div className="text-muted-foreground grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-foreground mb-1 font-medium">Payment Method:</p>
            <p>
              {paymentMethod === PaymentMethod.COD
                ? "Cash On Delivery"
                : paymentMethod === PaymentMethod.STRIPE
                  ? "Card"
                  : "N/A"}
            </p>
          </div>
          {refund?.refundAmount &&
            refund?.refundAt &&
            refund?.stripeRefundId && (
              <div>
                <p className="text-foreground mb-1 flex items-center gap-1 font-medium">
                  <Undo2 className="h-4 w-4" /> Refund Details:
                </p>
                <p>
                  Amount:{" "}
                  <span className="text-foreground font-semibold">
                    ${refund.refundAmount}
                  </span>
                </p>
                <p>
                  Refunded At:{" "}
                  <span className="text-foreground font-medium">
                    {formatDate(new Date(refund.refundAt))}
                  </span>
                </p>
                <p>
                  Refund ID:{" "}
                  <span className="text-foreground">
                    {refund.stripeRefundId}
                  </span>
                </p>
              </div>
            )}
        </div>
      </div>

      <Separator />

      {/* Order Timeline */}
      <div className="bg-muted border-border text-muted-foreground space-y-2 rounded-lg border p-4 text-sm shadow-sm">
        <p className="text-foreground mb-1 flex items-center gap-1 font-semibold">
          <CalendarCheck2 className="h-4 w-4" /> Order Timeline
        </p>
        <p className="flex items-center gap-1">
          Order Placed:{" "}
          <span className="text-foreground font-medium">
            {formatDate(new Date(orderPlaceAt))} -{" "}
            {formatTime(new Date(orderPlaceAt))}
          </span>
        </p>
        {confirmedAt && (
          <p className="flex items-center gap-1">
            Confirmed At:{" "}
            <span className="text-foreground font-medium">
              {formatDate(new Date(confirmedAt))} -{" "}
              {formatTime(new Date(confirmedAt))}
            </span>
          </p>
        )}
        <p className="flex items-center gap-1">
          {isDelivered ? (
            <>
              <PackageCheck className="h-4 w-4 text-green-600" /> Delivered:{" "}
              <span className="text-foreground font-medium">Yes</span>
            </>
          ) : (
            <>
              <PackageX className="h-4 w-4 text-red-600" /> Delivered:{" "}
              <span className="text-foreground font-medium">No</span>
            </>
          )}
        </p>
      </div>

      <Separator />

      {/* Ordered Items */}
      <div className="bg-muted border-border text-muted-foreground rounded-lg border p-4 text-sm shadow-sm">
        <p className="text-foreground mb-2 flex items-center gap-2 font-semibold">
          <PackageCheck className="h-4 w-4" /> Ordered Items
        </p>
        <ul className="space-y-4">
          {products?.length > 0 ? (
            products.map((product, index) => (
              <li key={index} className="flex items-center gap-4">
                {product.thumbnail && (
                  <div className="size-20 rounded-md border bg-white p-1">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="size-full rounded object-cover"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-foreground font-medium">{product.name}</p>
                  <p>
                    Quantity:{" "}
                    <span className="text-foreground font-semibold">
                      {product.orderedProductQuantity}
                    </span>
                  </p>
                  <p>
                    Price:{" "}
                    <span className="text-foreground font-semibold">
                      ${product.price}
                    </span>
                  </p>
                </div>
              </li>
            ))
          ) : (
            <li className="text-foreground">No items ordered.</li>
          )}
        </ul>
        <p className="text-foreground mt-4 flex items-center gap-1">
          <DollarSign className="h-4 w-4" /> Total Amount:{" "}
          <span className="font-semibold">${totalAmount}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
