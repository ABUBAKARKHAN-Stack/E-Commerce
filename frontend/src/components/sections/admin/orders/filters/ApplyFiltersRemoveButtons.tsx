import { Button } from '@/components/ui/button'
import  { FC } from 'react'

type Props = {
    filterCount: number;
    onFilterApply: () => void;
    onFilterRemove: () => void
}

const ApplyFiltersRemoveButtons: FC<Props> = ({
    filterCount,
    onFilterApply,
    onFilterRemove

}) => {
    return (
        <div className='flex justify-between w-full items-center gap-x-4'>
            <Button
                disabled={filterCount <= 0}
                onClick={onFilterApply}
                className="rounded-none flex-1 px-4 py-5 text-base transition-colors ease-linear"
            >
                Apply All Filters
                {filterCount > 0 && (
                    <span className="flex size-6 items-center justify-center rounded-full bg-cyan-200 font-bold text-cyan-600 dark:bg-orange-200 dark:text-orange-600">
                        {filterCount}
                    </span>
                )}
            </Button>
            <Button
                onClick={onFilterRemove}
                disabled={filterCount <= 0}
                className="rounded-none flex-1 px-4 py-5 text-base transition-colors ease-linear"
            >
                Remove All Filters
                {filterCount > 0 && (
                    <span className="flex size-6 items-center justify-center rounded-full bg-cyan-200 font-bold text-cyan-600 dark:bg-orange-200 dark:text-orange-600">
                        {filterCount}
                    </span>
                )}
            </Button>
        </div>
    )
}

export default ApplyFiltersRemoveButtons