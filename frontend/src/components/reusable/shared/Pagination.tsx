import { Dispatch, FC, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

type Props = {
    limit: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    totalProducts: number;
}

const Pagination: FC<Props> = ({
    limit,
    page,
    setPage,
    totalProducts
}) => {

    const start = (page - 1) * limit + 1;
    const end = Math.min((start + limit - 1), totalProducts)


    return (
        <>
            <div className='flex z-10 flex-col gap-y-3 items-center w-full'>
                <div className='flex items-center shrink justify-center mt-5 dark:bg-gradient-to-r dark:from-orange-500 dark:to-orange-600 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full p-1.5 shadow-lg'>
                    <button
                        className='rounded-full !bg-white !text-gray-900 px-3 sm:px-6 py-2.5 flex items-center gap-1 sm:gap-2 shadow-sm hover:shadow-md hover:!bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:!bg-white font-medium text-xs sm:text-sm'
                        onClick={() => {
                            if (page <= 1) return;
                            setPage((prev) => prev - 1)
                        }}
                        disabled={page === 1}
                    >
                        <ArrowLeftCircle className='size-3 sm:size-4' />
                        <span className='hidden xs:inline'>Previous</span>
                        <span className='xs:hidden'>Prev</span>
                    </button>

                    {/* Separator */}
                    <div className='w-px h-4 sm:h-6 bg-white/30 mx-1 sm:mx-2'></div>

                    {/* Current PAGE */}
                    <div className='px-2 sm:px-6 py-2.5 font-semibold text-white min-w-[80px] sm:min-w-[140px] text-center text-xs sm:text-sm'>
                        <span className='hidden sm:inline'>Page {page} of {Math.ceil(totalProducts / limit)}</span>
                        <span className='sm:hidden'>{page}/{Math.ceil(totalProducts / limit)}</span>
                    </div>

                    {/* Separator */}
                    <div className='w-px h-4 sm:h-6 bg-white/30 mx-1 sm:mx-2'></div>

                    <button
                        className='rounded-full !bg-white !text-gray-900 px-3 sm:px-6 py-2.5 flex items-center gap-1 sm:gap-2 shadow-sm hover:shadow-md hover:!bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:!bg-white font-medium text-xs sm:text-sm'
                        disabled={(page * limit) >= totalProducts}
                        onClick={() => {
                            if ((page * limit) >= totalProducts) return;
                            setPage((prev) => prev + 1);
                        }}
                    >
                        <span className='hidden xs:inline'>Next</span>
                        <span className='xs:hidden'>Next</span>
                        <ArrowRightCircle className='size-3 sm:size-4' />
                    </button>
                </div>
                <p className='text-base font-semibold dark:text-gray-300 text-gray-900'>
                    Showing {start}–{end} of {totalProducts} products
                </p>
            </div>

        </>

    )
}

export default Pagination