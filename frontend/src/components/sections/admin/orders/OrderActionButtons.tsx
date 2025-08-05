import { Button } from '@/components/ui/button'
import { useAdminOrderContext } from '@/context/adminOrderContext';
import { AdminOrderLoading, OrderStatus } from '@/types/main.types';
import { CheckCheck, CircleArrowLeft, Loader2, Truck } from 'lucide-react'
import { FC } from 'react'
import { useNavigate, useRevalidator } from 'react-router-dom';

type Props = {
    orderStatus: string;
    orderId: string

}

const OrderActionButtons: FC<Props> = ({
    orderStatus,
    orderId
}) => {

    const {
        loading,
        markOrderAsDelivered,
        markOrderAsProcessing,
        markOrderAsShipped
    } = useAdminOrderContext();
    const { revalidate } = useRevalidator();
    const navigate = useNavigate()

    const processingLoading = loading === AdminOrderLoading.MARK_AS_PROCESSING;
    const shippedLoading = loading === AdminOrderLoading.MARK_AS_SHIPPIED;
    const deliveredLoading = loading === AdminOrderLoading.MARK_AS_DELIVERED;

    return (
        <>
            {orderStatus !== OrderStatus.CANCELLED && orderStatus !== OrderStatus.PENDING && (
                <div className="mt-6 flex flex-wrap justify-between items-center border-t pt-4">
                    <div className="space-y-4 space-x-4">
                        {/* Mark as Processing */}
                        <Button
                            disabled={processingLoading || orderStatus !== OrderStatus.CONFIRMED}
                            onClick={() => markOrderAsProcessing(orderId, revalidate)}
                            size="lg"
                        >
                            {processingLoading ? (
                                <Loader2 className="animate-spin-faster" />
                            ) : (
                                <Loader2 />
                            )}
                            Mark as Processing
                        </Button>

                        {/* Mark as Shipped */}
                        <Button
                            disabled={shippedLoading || orderStatus !== OrderStatus.PROCESSING}
                            onClick={() => markOrderAsShipped(orderId, revalidate)}
                            size="lg"
                        >
                            {shippedLoading ? (
                                <Loader2 className="animate-spin-faster" />
                            ) : (
                                <Truck />
                            )}
                            Mark as Shipped
                        </Button>

                        {/* Mark as Delivered */}
                        <Button
                            disabled={deliveredLoading || orderStatus !== OrderStatus.SHIPPED}
                            onClick={() => markOrderAsDelivered(orderId, revalidate)}
                            size="lg"
                        >
                            {deliveredLoading ? (
                                <Loader2 className="animate-spin-faster" />
                            ) : (
                                <CheckCheck />
                            )}
                            Mark as Delivered
                        </Button>
                    </div>

                    <div>
                        <Button
                            onClick={() => navigate(-1)}
                            variant="outline" size="lg">
                            <CircleArrowLeft />
                            Go Back
                        </Button>
                    </div>
                </div>

            )}
        </>
    )
}

export default OrderActionButtons