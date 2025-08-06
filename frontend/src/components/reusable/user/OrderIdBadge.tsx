const OrderIdBadge = ({
  orderId,
  className = "",
}: {
  orderId: string;
  className?: string;
}) => {
  return (
    <div
      className={`orderid-badge mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-5 py-2.5 text-sm font-medium text-cyan-700 dark:border-orange-500/30 dark:bg-orange-500/20 dark:text-orange-300 ${className}`}
    >
      ORDER-ID: #{orderId}
    </div>
  );
};

export default OrderIdBadge;
