import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { AdminOrderFiltersType, OrderStatus } from '@/types/main.types'
import { Dispatch, FC, SetStateAction } from 'react'



type Props = {
    filters: AdminOrderFiltersType;
    setFilters: Dispatch<SetStateAction<AdminOrderFiltersType>>
}
const OrderStatusFilter: FC<Props> = ({
    filters,
    setFilters
}) => {

    const filterByOrderStatus = [
        { label: "Pending", value: OrderStatus.PENDING, id: "order-status-pending" },
        { label: "Cancelled", value: OrderStatus.CANCELLED, id: "order-status-cancelled" },
        { label: "Confirmed", value: OrderStatus.CONFIRMED, id: "order-status-confirmed" },
        { label: "Processing", value: OrderStatus.PROCESSING, id: "order-status-processing" },
        { label: "Shipped", value: OrderStatus.SHIPPED, id: "order-status-shipped" },
        { label: "Delivered", value: OrderStatus.DELIVERED, id: "order-status-delivered" },
    ]
    return (
        <div className='flex flex-col gap-y-3'>
            <div>
                <h3 className='text-lg font-semibold dark:text-gray-300 text-gray-900'>Filter By Order Status:</h3>
                <Separator />
            </div>
            <RadioGroup
                value={filters.status || ""}

                onValueChange={(value) => setFilters((prev) => ({
                    ...prev, status: value
                }))}
                className='flex flex-wrap gap-4'
            >
                {filterByOrderStatus.map(({
                    label,
                    value,
                    id
                }, i) => (
                    <div
                        key={i}
                        className='flex items-center gap-x-2'>
                        <Label
                            htmlFor={id}
                            className='cursor-pointer'
                        >
                            {label}
                        </Label>
                        <RadioGroupItem
                            value={value}
                            id={id}
                            className='cursor-pointer'
                        />
                        {
                            filterByOrderStatus.length - 1 > i && <Separator
                                orientation="vertical"
                            />
                        }
                    </div>
                ))}

            </RadioGroup>

        </div>
    )
}

export default OrderStatusFilter