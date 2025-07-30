import { Badge } from '@/components/ui/badge';
import { OrderStatus } from '@/types/main.types';
import React, { FC } from 'react';

type Props = {
    orderStatus: string;
};

const statusVariants: Record<OrderStatus, 'default' | 'error' | 'info' | 'warning' | 'success'> = {
    [OrderStatus.PENDING]: 'warning',
    [OrderStatus.CONFIRMED]: 'info',
    [OrderStatus.PROCESSING]: 'info',
    [OrderStatus.SHIPPED]: 'default',
    [OrderStatus.DELIVERED]: 'success',
    [OrderStatus.CANCELLED]: 'error',
};

const OrderStatusBadge: FC<Props> = ({ orderStatus }) => {
    const status = Object.values(OrderStatus).includes(orderStatus as OrderStatus)
        ? (orderStatus as OrderStatus)
        : OrderStatus.PENDING;

    return (
        <Badge variant={statusVariants[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    );
};

export default OrderStatusBadge;
