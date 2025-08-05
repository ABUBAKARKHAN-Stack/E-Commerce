import { OrderStatusBadge, ToolTip } from '@/components/reusable/shared'
import { IOrder } from '@/types/main.types'
import { formatDate } from 'date-fns'
import { Calendar, CreditCard, Eye, MapPin, Package, User } from 'lucide-react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

type OrderCardProps = {
    order: IOrder
}

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
        shippingAddress
    } = order;

    const handleViewOrder = () => {
        navigate(`/admin/orders/${orderId}`);
    };

    const hasShippingAddress = shippingAddress && shippingAddress.fullName;
    const hasRefund = refund?.refundAmount && refund?.refundAt;
    const displayPaymentMethod = paymentMethod || 'N/A';
    const itemCount = cart?.products?.length || 0;
    const totalAmount = cart?.totalAmount || 0;

    return (
        <div className="group bg-white dark:bg-zinc-900 rounded-xl xxxs:rounded-2xl border border-gray-50 dark:border-zinc-800 p-4 xxxs:p-6 hover:shadow-2xl hover:shadow-blue-500/5 hover:border-gray-100 dark:hover:border-zinc-700 transition-all duration-500 relative overflow-hidden mb-4 xxxs:mb-6 break-inside-avoid">
            {/* Refined gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-indigo-50/10 dark:from-blue-950/5 dark:via-transparent dark:to-indigo-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Header */}
            <div className="relative flex flex-col xxxs:flex-row xxxs:items-start xxxs:justify-between gap-4 xxxs:gap-0 mb-6">
                <div className="flex items-center gap-3 xxxs:gap-4">
                    <div className="relative">
                        <div className="w-10 h-10 xxxs:w-11 xxxs:h-11 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 dark:shadow-blue-400/10">
                            <Package className="w-4 h-4 xxxs:w-5 xxxs:h-5 text-white" />
                        </div>
                        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 xxxs:w-3 xxxs:h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base xxxs:text-lg font-semibold text-gray-900 dark:text-white tracking-tight">#{orderId}</h3>
                            <ToolTip
                                triggerValue={<button
                                    onClick={handleViewOrder}
                                    className="cursor-pointer p-1 xxxs:p-1.5 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-orange-900/20 dark:hover:text-orange-400 rounded-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <Eye className="w-3.5 h-3.5 xxxs:w-4 xxxs:h-4" />
                                </button>}
                                tooltip='View order details'
                            />
                        </div>
                        <p className="text-xs xxxs:text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {formatDate(new Date(createdAt), 'MMM dd, yyyy • hh:mm a')}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row xxxs:flex-col items-start xxxs:items-end justify-between xxxs:justify-start gap-2 xxxs:gap-3">
                    <OrderStatusBadge orderStatus={status} />
                    <div className="text-right">
                        <span className="text-xl xxxs:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                            ${totalAmount.toFixed(2)}
                        </span>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {itemCount} item{itemCount !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="relative grid grid-cols-1 gap-6 mb-6 xsm:grid-cols-2">
                {/* Customer Section */}
                {hasShippingAddress && (
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider xxxs:tracking-widest">Customer</h4>
                        <div className="space-y-2 xxxs:space-y-3">
                            <div className="flex items-center gap-2 xxxs:gap-3">
                                <div className="w-7 h-7 xxxs:w-8 xxxs:h-8 bg-gray-50 dark:bg-zinc-800 rounded-lg xxxs:rounded-xl flex items-center justify-center">
                                    <User className="w-3.5 h-3.5 xxxs:w-4 xxxs:h-4 text-gray-600 dark:text-gray-400" />
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white text-xs xxxs:text-sm">
                                    {shippingAddress.fullName}
                                </span>
                            </div>
                            {shippingAddress.city && shippingAddress.country && (
                                <div className="flex items-center gap-2 xxxs:gap-3">
                                    <div className="w-7 h-7 xxxs:w-8 xxxs:h-8 bg-gray-50 dark:bg-zinc-800 rounded-lg xxxs:rounded-xl flex items-center justify-center">
                                        <MapPin className="w-3.5 h-3.5 xxxs:w-4 xxxs:h-4 text-gray-600 dark:text-gray-400" />
                                    </div>
                                    <span className="text-xs xxxs:text-sm text-gray-600 dark:text-gray-400">
                                        {shippingAddress.city}, {shippingAddress.country}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Payment Section */}
                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider xxxs:tracking-widest">Payment</h4>
                    <div className="space-y-2 xxxs:space-y-3">
                        <div className="flex items-center gap-2 xxxs:gap-3">
                            <div className="w-7 h-7 xxxs:w-8 xxxs:h-8 bg-gray-50 dark:bg-zinc-800 rounded-lg xxxs:rounded-xl flex items-center justify-center">
                                <CreditCard className="w-3.5 h-3.5 xxxs:w-4 xxxs:h-4 text-gray-600 dark:text-gray-400" />
                            </div>
                            <span className="text-xs xxxs:text-sm font-medium text-gray-900 dark:text-white">
                                {displayPaymentMethod}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 xxxs:gap-3">
                            <div className="w-7 h-7 xxxs:w-8 xxxs:h-8 flex items-center justify-center">
                                <div className={`w-2.5 h-2.5 xxxs:w-3 xxxs:h-3 rounded-full ${paymentStatus === 'PAID'
                                    ? 'bg-green-500'
                                    : paymentStatus === 'UNPAID'
                                        ? 'bg-red-500'
                                        : paymentStatus === 'REFUNDED'
                                            ? 'bg-purple-500'
                                            : 'bg-gray-500'
                                    }`} />
                            </div>
                            <span className={`text-xs xxxs:text-sm font-semibold ${paymentStatus === 'PAID'
                                ? 'text-green-600 dark:text-green-400'
                                : paymentStatus === 'UNPAID'
                                    ? 'text-red-600 dark:text-red-400'
                                    : paymentStatus === 'REFUNDED'
                                        ? 'text-purple-600 dark:text-purple-400'
                                        : 'text-gray-600 dark:text-gray-400'
                                }`}>
                                {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1).toLowerCase()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Footer */}
            {(confirmedAt || deliveryDate) && (
                <div className="relative pt-4 border-t border-gray-50 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col xxxs:flex-row xxxs:items-center gap-3 xxxs:gap-6">
                            {confirmedAt && (
                                <div className="flex items-center gap-1.5 xxxs:gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                    <div className="w-1.5 h-1.5 xxxs:w-2 xxxs:h-2 bg-emerald-500 rounded-full" />
                                    <span>Confirmed {formatDate(new Date(confirmedAt), 'MMM dd')}</span>
                                </div>
                            )}
                            {deliveryDate && (
                                <div className="flex items-center gap-1.5 xxxs:gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                                    <Calendar className="w-2.5 h-2.5 xxxs:w-3 xxxs:h-3" />
                                    <span>Delivery {formatDate(new Date(deliveryDate), 'MMM dd')}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Refund Alert */}
            {hasRefund && (
                <div className="relative mt-3 xxxs:mt-4 p-3 xxxs:p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/10 border border-red-100 dark:border-red-800/30 rounded-xl xxxs:rounded-2xl">
                    <div className="flex items-center gap-2 xxxs:gap-3 text-xs xxxs:text-sm">
                        <div className="w-5 h-5 xxxs:w-6 xxxs:h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <div className="w-1.5 h-1.5 xxxs:w-2 xxxs:h-2 bg-white rounded-full" />
                        </div>
                        <div className="text-red-700 dark:text-red-400 font-medium">
                            <span className="font-bold">Refunded:</span> ${refund.refundAmount!.toFixed(2)} • {formatDate(new Date(refund.refundAt!), 'MMM dd, yyyy')}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderCard