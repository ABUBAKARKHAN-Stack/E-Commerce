import { Select } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { AdminOrderFiltersType } from '@/types/main.types';
import { ArrowDown01, Clock, SortAsc, Truck } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';


type Props = {
    filters: AdminOrderFiltersType;
    setFilters: Dispatch<SetStateAction<AdminOrderFiltersType>>
}
const OrderSortBySelector: FC<Props> = ({
    filters,
    setFilters
}) => {

    const sortByOptions = [
        {
            label: (
                <div className="flex items-center gap-x-1">
                    <Clock className="size-4.5 stroke-3" />
                    <span>Date</span>
                </div>
            ),
            options: [
                { value: "newest", label: "Newest", group: "date" },
                { value: "oldest", label: "Oldest", group: "date" },
            ],
        },
        {
            label: (
                <div className="flex items-center gap-x-1">
                    <ArrowDown01 className="size-4.5 stroke-3" />
                    <span>Total Amount</span>
                </div>
            ),
            options: [
                { value: "amountAsc", label: "Lowest", group: "amount" },
                { value: "amountDesc", label: "Highest", group: "amount" },
            ],
        },
        {
            label: (
                <div className="flex items-center gap-x-1">
                    <Truck className="size-4.5 stroke-3" />
                    <span>ETA</span>
                </div>
            ),
            options: [
                { value: "etaSoonest", label: "Soonest", group: "eta" },
                { value: "etaLatest", label: "Latest", group: "eta" },
            ],
        },
    ];

    return (
        <div className='flex flex-col gap-y-3'>
            <div>
                <h3 className='text-lg font-semibold dark:text-gray-300 flex items-center gap-x-1.5 text-gray-900'><SortAsc />Sort Orders:</h3>
                <Separator />
            </div>
            <Select
                options={sortByOptions}
                value={filters.sortBy || ""}
                onChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
                placeholder='Sort By'
                className='dark:bg-[#18181b]/80 bg-[#f8f7f7]/80 '
                selectContentColor='dark:bg-[#18181b]/80 bg-[#f8f7f7]/80'
            />
        </div>
    )
}

export default OrderSortBySelector