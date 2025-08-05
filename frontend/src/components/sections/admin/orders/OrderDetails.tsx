import { OrderStatusBadge } from '@/components/reusable/shared'
import { Package, Clock, CreditCard, MapPin, User, Phone, Truck, Zap, Gift, CheckCircle2, AlertCircle, Mail, XCircle } from 'lucide-react'
import { FC } from 'react'
import { formatDate, formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns'
import { IShippingAddress, PaymentStatus, Refund, ShippingMethod } from '@/types/main.types'
import OrderActionButtons from './OrderActionButtons'


type Product = {
    name: string
    orderedProductQuantity: number
    price: number
    thumbnail: string
}


type OrderDetailsProps = {
    orderId: string
    products: Product[]
    totalAmount: number
    confirmedAt?: string
    orderStatus: string
    shippingAddress?: IShippingAddress
    shippingMethod?: ShippingMethod
    shipping?: number
    paymentStatus: PaymentStatus
    refund?: Refund
    paymentMethod?: string
    deliveryDate?: string
    isDelivered?: boolean
    orderPlaceAt: string;
    cancelledAt?: string;
}

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
    cancelledAt
}) => {

    const hasShippingAddress = shippingAddress && shippingAddress.fullName
    const hasRefund = refund?.refundAmount && refund?.refundAt && refund?.stripeRefundId;
    const itemCount = products.length
    const subtotal = totalAmount - shipping
    const orderAge = formatDistanceToNowStrict(orderPlaceAt)

    const getShippingIcon = (method?: ShippingMethod) => {
        switch (method) {
            case ShippingMethod.FREE: return Gift
            case ShippingMethod.EXPRESS: return Zap
            default: return Truck
        }
    }

    const getShippingLabel = (method?: ShippingMethod) => {
        switch (method) {
            case ShippingMethod.FREE: return 'Free Shipping'
            case ShippingMethod.EXPRESS: return 'Express Delivery'
            default: return 'Standard Shipping'
        }
    }

    const ShippingIcon = getShippingIcon(shippingMethod);



    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden">
            {/* Executive Header */}
            <div className="bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 px-8 py-6 border-b border-gray-200 dark:border-zinc-700">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                                Order #{orderId}
                            </h1>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {formatDate(new Date(orderPlaceAt), 'MMM dd, yyyy • hh:mm a')}
                                </span>
                                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400 rounded-full w-fit">
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
                                {itemCount} item{itemCount !== 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8">
                {/* Data Grid */}
                <div className="space-y-8 mb-8">
                    {/* Order Items */}
                    <div className="w-full">
                        <div className="flex items-center gap-2 mb-4">
                            <Package className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Items Ordered</h2>
                        </div>
                        <div className="space-y-3">
                            {products.map((product, index) => (
                                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg border border-gray-100 dark:border-zinc-700">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.name}
                                        className="w-14 h-14 object-cover rounded-lg bg-white border border-gray-200 dark:border-zinc-600 flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                                            {product.name}
                                        </h3>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                            <span className="text-sm text-gray-500">Qty: {product.orderedProductQuantity}</span>
                                            <span className="text-sm text-gray-500">Unit: ${product.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="self-end sm:self-center">
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            ${(product.price * product.orderedProductQuantity).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary Panel */}
                    <div className="w-full flex flex-col lg:flex-row gap-8">
                        {/* Financial Summary */}
                        <div className="bg-gray-50 w-full dark:bg-zinc-800 rounded-lg p-6 border border-gray-100 dark:border-zinc-700">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                <h3 className="font-semibold text-gray-900 dark:text-white">Payment</h3>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                    <span className="text-gray-900 dark:text-white font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                                    <span className="text-gray-900 dark:text-white font-medium">${shipping?.toFixed(2) || 'N/A'}</span>
                                </div>
                                <div className="border-t border-gray-200 dark:border-zinc-600 pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">${totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 dark:border-zinc-600 pt-3 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-400">Method</span>
                                        <span className="text-gray-900 dark:text-white font-medium">{paymentMethod || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-400">Status</span>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${paymentStatus === PaymentStatus.PAID ? 'bg-green-500' :
                                                paymentStatus === PaymentStatus.UNPAID ? 'bg-red-500' :
                                                    'bg-purple-500'
                                                }`} />
                                            <span className={`text-sm font-medium ${paymentStatus === PaymentStatus.PAID ? 'text-green-700 dark:text-green-400' :
                                                paymentStatus === PaymentStatus.UNPAID ? 'text-red-700 dark:text-red-400' :
                                                    'text-purple-700 dark:text-purple-400'
                                                }`}>
                                                {paymentStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Details */}
                        {hasShippingAddress && (
                            <div className="bg-gray-50 w-full dark:bg-zinc-800 rounded-lg p-6 border border-gray-100 dark:border-zinc-700">
                                <div className="flex items-center gap-2 mb-4">
                                    <ShippingIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Shipping</h3>
                                </div>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                                            {getShippingLabel(shippingMethod)}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                            <span className="text-gray-900 dark:text-white font-medium">{shippingAddress.fullName}</span>
                                        </div>
                                        {shippingAddress.phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                                <span className="text-gray-600 dark:text-gray-400">{shippingAddress.phone}</span>
                                            </div>
                                        )}
                                        {shippingAddress.email && (
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                                <span className="text-gray-600 dark:text-gray-400">{shippingAddress.email}</span>
                                            </div>
                                        )}
                                        <div className="flex items-start gap-2">
                                            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                            <div className="text-gray-600 dark:text-gray-400">
                                                {shippingAddress.addressLine1 && <div>{shippingAddress.addressLine1}</div>}
                                                {shippingAddress.addressLine2 && <div>{shippingAddress.addressLine2}</div>}
                                                <div>
                                                    {shippingAddress.city && `${shippingAddress.city}, `}
                                                    {shippingAddress.state && `${shippingAddress.state} `}
                                                    {shippingAddress.postalCode && `${shippingAddress.postalCode}, `}
                                                    {shippingAddress.country}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 pt-2">
                                            {isDelivered && (
                                                <>
                                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                    <span className="text-sm font-medium text-green-700 dark:text-green-400">Delivered</span>
                                                </>
                                            )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Timeline */}
                <div className="border-t border-gray-200 dark:border-zinc-700 pt-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Clock className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order Timeline</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start sm:items-center gap-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <Package className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 dark:text-white">Order Placed</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {formatDate(new Date(orderPlaceAt), 'MMM dd, yyyy • hh:mm a')}
                                </div>
                            </div>
                        </div>

                        {confirmedAt && (
                            <div className="flex items-start sm:items-center gap-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-white">Order Confirmed</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {formatDate(new Date(confirmedAt), 'MMM dd, yyyy • hh:mm a')}
                                    </div>
                                </div>
                            </div>
                        )}
                        {deliveryDate && cancelledAt && (
                            <div className="flex items-start sm:items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-800/20 rounded-lg border border-gray-200 dark:border-zinc-700">
                                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-white">Expected Delivery (Cancelled)</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 line-through">
                                        {formatDate(new Date(deliveryDate), 'MMM dd, yyyy • hh:mm a')}
                                    </div>
                                </div>
                            </div>
                        )}


                        {deliveryDate && !cancelledAt && (
                            <div className="flex items-start sm:items-center gap-4 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDelivered ? 'bg-green-600' : 'bg-purple-600'
                                    }`}>
                                    {isDelivered ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Clock className="w-4 h-4 text-white" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {isDelivered ? 'Delivered' : 'Expected Delivery'}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {formatDate(new Date(deliveryDate), 'MMM dd, yyyy • hh:mm a')}
                                    </div>
                                </div>
                            </div>
                        )}

                        {cancelledAt && (
                            <div className="flex items-start sm:items-center gap-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <XCircle className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-white">Order Cancelled</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {formatDate(new Date(cancelledAt), 'MMM dd, yyyy • hh:mm a')}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Refund Alert */}
                {hasRefund && (
                    <div className="mt-8 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex md:flex-row flex-col items-start md:items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-red-800 dark:text-red-400">
                                    Refund Processed
                                </div>
                                <div className="text-sm text-red-700 dark:text-red-500">
                                    ${refund.refundAmount.toFixed(2)} • {formatDate(new Date(refund.refundAt), 'MMM dd, yyyy')}
                                </div>
                            </div>
                            <div className="text-sm text-red-700 dark:text-red-400 max-w-full truncate sm:text-right">
                                <span className="font-medium">Stripe Refund ID:</span> {refund.stripeRefundId}
                            </div>
                        </div>
                    </div>
                )}

                <OrderActionButtons
                    orderStatus={orderStatus}
                    orderId={orderId}
                />

            </div>
        </div>
    )
}

export default OrderDetails