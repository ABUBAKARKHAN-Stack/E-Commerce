import { ToolTip } from '@/components/reusable/shared'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import { FC } from 'react';

type Props = {
    isOpenToggle: boolean;
    setIsOpenToggle: (isOpen:boolean) => void;
    filterCount: number;
}
const FilterToggleButton:FC<Props> = ({
    isOpenToggle,
    setIsOpenToggle,
    filterCount
}) => {
    return (
        <ToolTip
            triggerValue={
                <Button onClick={() => setIsOpenToggle(!isOpenToggle)} className='size-12 relative mt-6.5'>
                    <div className='absolute -top-2 border-0 -right-2  size-4.5 bg-red-600 rounded-full'>
                        <span className='size-full text-[11px] font-bold flex justify-center items-center  rounded-full'>{filterCount}</span>
                    </div>
                    <Filter className='size-6' />
                </Button>
            }
            tooltip={"Click to filter or sort products"}
        />)
}

export default FilterToggleButton