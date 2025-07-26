
const OrderIdBadge = ({ orderId, className = "" }: { orderId: string, className?: string }) => {
    return (
        <div className={`orderid-badge inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full text-sm font-medium bg-cyan-50 text-cyan-700 border border-cyan-200 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-500/30 ${className}`}>
            ORDER-ID: {orderId}
        </div>
    )
}

export default OrderIdBadge