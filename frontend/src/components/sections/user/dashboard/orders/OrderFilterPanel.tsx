import { DashboardSectionHeader } from '@/components/reusable/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { trackOrderSchema } from '@/schemas/track-orderSchema';
import { Clock, Filter, List, Search, } from 'lucide-react';
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'

type Props = {
    status: string;
    sortBy: string;
    setStatus: Dispatch<SetStateAction<string>>;
    setOrderId: Dispatch<SetStateAction<string>>;
    setSortBy: Dispatch<SetStateAction<string>>;
    totalOrders: any[];
    setFilterError: Dispatch<SetStateAction<string>>;
    setError: Dispatch<SetStateAction<string>>;
    error: string;
}

const OrderFilterPanel: FC<Props> = ({
    status,
    sortBy,
    setOrderId,
    setSortBy,
    setStatus,
    totalOrders,
    setFilterError,
    setError,
    error,
}) => {

    const [orderIdLocally, setOrderIdLocally] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const result = trackOrderSchema.shape.orderId.safeParse(value);

        if (!result.success) {
            setError(result.error.errors[0].message);
            setOrderId("");
        } else {
            setError("");
        }
        setOrderIdLocally(value)
    }


    const sortByOptions = [{
        label: <div className='flex items-center gap-x-1'>
            <Clock className='size-4.5 stroke-3' />
            <span>Date</span>
        </div>,
        options: [
            { value: "newest", label: "Newest", group: "date" },
            { value: "oldest", label: "Oldest", group: "date" },
        ]
    }]

    const statusOptions = [
        {
            label: <div className="flex items-center gap-x-1">
                <List className="size-4.5 stroke-3" />
                <span>Order Status</span>
            </div>
            ,
            options: [
                { value: "pending", label: "Pending", group: "status" },
                { value: "confirmed", label: "Confirmed", group: "status" },
                { value: "cancelled", label: "Cancelled", group: 'status' }
            ],
        },
    ];

    const handleSearchOrder = () => {
        if (!orderIdLocally || error) return;

        setStatus('');
        setSortBy('newest');
        setOrderId(orderIdLocally);

        const found = totalOrders.find((o) => o.orderId === orderIdLocally.trim());
        if (!found) {
            setFilterError(`No order found with ID: ${orderIdLocally}`);
        } else {
            setFilterError('');
        }
    };

    const handleStatusChange = (value: string) => {
        setOrderId('');
        setOrderIdLocally('');
        setStatus(value);

        const filtered = totalOrders.filter((o) => o.status === value);
        if (filtered.length === 0) {
            setFilterError(`No orders found with status "${value}"`);
        } else {
            setFilterError('');
        }
    };




    return (
        <div className='space-y-6'>
            <DashboardSectionHeader
                mainHeading="Order Filters & Search"
                mainIcon={<Filter className="size-8 stroke-[2.5]" />}
                animateClassName=''
            />
            <div className="flex gap-6  justify-between">
                <div className='w-[40%] relative'>
                    <div className='relative'>
                        <Input
                            name='orderId'
                            placeholder='Search Order By Order Id'
                            onChange={handleChange}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}

                            value={orderIdLocally}
                            className='w-full'
                        />
                        <Button
                            onClick={handleSearchOrder}
                            disabled={orderIdLocally.length < 8}
                            variant={'ghost'} size={'icon'} className='absolute top-1/2 -translate-y-1/2 right-2'>
                            <Search
                                className='text-muted-foreground'
                            />
                        </Button>
                    </div>

                    {isFocus && error && <span className='mt-2 block font-medium text-xs text-destructive-foreground'>{error}</span>}
                </div>
                <div className='flex gap-2 w-[60%]'>
                    {/* Status Filter */}
                    <div className='relative z-10 w-full'>
                        <Select
                            onChange={handleStatusChange}
                            value={status}
                            options={statusOptions}
                            placeholder="Filter by status"
                            className='w-full absolute'
                        />
                    </div>

                    {/* Sort By */}
                    <div className='relative z-10 w-full'>
                        <Select
                            onChange={(value => setSortBy(value))}
                            value={sortBy}
                            options={sortByOptions}
                            placeholder="Sort by"
                            className='w-full absolute'
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OrderFilterPanel;
