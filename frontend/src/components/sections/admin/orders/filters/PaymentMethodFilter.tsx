import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { AdminOrderFiltersType, PaymentMethod, } from '@/types/main.types';
import { Dispatch, FC, SetStateAction } from 'react';


type Props = {
    filters: AdminOrderFiltersType;
    setFilters: Dispatch<SetStateAction<AdminOrderFiltersType>>
}
const PaymentMethodFilter: FC<Props> = ({
    filters,
    setFilters
}) => {

    const filterByPaymentMethod = [
        { label: "COD (Cash on Delivery)", value: PaymentMethod.COD, id: "payment-method-cod" },
        { label: "Stripe (Card Payment)", value: PaymentMethod.STRIPE, id: "payment-method-stripe" },
    ]

    return (
        <div className='flex flex-col gap-y-3'>
            <div>
                <h3 className='text-lg font-semibold dark:text-gray-300 text-gray-900'>Filter By Payment Method:</h3>
                <Separator />
            </div>
            <RadioGroup
                value={filters.paymentMethod || ""}
                onValueChange={(value) => setFilters((prev) => ({
                    ...prev, paymentMethod: value
                }))}
                className='flex flex-wrap gap-4'
            >
                {filterByPaymentMethod.map(({
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
                            filterByPaymentMethod.length - 1 > i && <Separator
                                orientation="vertical"
                            />
                        }
                    </div>
                ))}

            </RadioGroup>
        </div>

    )
}

export default PaymentMethodFilter