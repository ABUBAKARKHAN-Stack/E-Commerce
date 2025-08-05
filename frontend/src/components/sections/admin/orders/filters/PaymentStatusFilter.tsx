import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { AdminOrderFiltersType, PaymentStatus } from '@/types/main.types';
import { Dispatch, FC, SetStateAction } from 'react';


type Props = {
    filters: AdminOrderFiltersType;
    setFilters: Dispatch<SetStateAction<AdminOrderFiltersType>>
}

const PaymentStatusFilter: FC<Props> = ({
    filters,
    setFilters
}) => {

    const filterByPaymentStatus = [
        { label: "Paid", value: PaymentStatus.PAID, id: "payment-status-paid" },
        { label: "Unpaid", value: PaymentStatus.UNPAID, id: "payment-status-unpaid" },
        { label: "Refunded", value: PaymentStatus.REFUNDED, id: "payment-status-refunded" },
    ]
    return (
        <div className='flex flex-col gap-y-3'>
            <div>
                <h3 className='text-lg font-semibold dark:text-gray-300 text-gray-900'>Filter By Payment Status:</h3>
                <Separator />
            </div>
            <RadioGroup
                value={filters.paymentStatus || ""}
                onValueChange={(value) => setFilters((prev) => ({
                    ...prev, paymentStatus: value
                }))}
                className='flex flex-wrap gap-4'
            >
                {filterByPaymentStatus.map(({
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
                            filterByPaymentStatus.length - 1 > i && <Separator
                                orientation="vertical"
                            />
                        }
                    </div>
                ))}

            </RadioGroup>
        </div>
    )
}

export default PaymentStatusFilter