import { Dispatch, FC, SetStateAction } from 'react'

import { Button } from '@/components/ui/button'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
            <div className='flex z-10 flex-col gap-y-5 items-center w-full'>
                <div className='flex items-center justify-center mt-5 dark:bg-gradient-to-r dark:from-orange-500 dark:to-orange-600 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full p-1.5 shadow-lg'>
                    <Button
                        className='rounded-full !bg-white !text-gray-900 px-6 py-2.5 flex items-center gap-2 shadow-sm hover:shadow-md hover:!bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:!bg-white font-medium'
                        onClick={() => {
                            if (page <= 1) return;
                            setPage((prev) => prev - 1)
                        }}
                        disabled={page === 1}
                        size={"lg"}>
                        <ArrowLeftCircle className='size-4' />
                        Previous
                    </Button>

                    {/* Separator */}
                    <div className='w-px h-6 bg-white/30 mx-2'></div>

                    {/* Current PAGE */}
                    <div className='px-6 py-2.5 font-semibold text-white min-w-[140px] text-center text-sm'>
                        Page {page} of {Math.ceil(totalProducts / limit)}
                    </div>

                    {/* Separator */}
                    <div className='w-px h-6 bg-white/30 mx-2'></div>

                    <Button
                        className='rounded-full !bg-white !text-gray-900 px-6 py-2.5 flex items-center gap-2 shadow-sm hover:shadow-md hover:!bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:!bg-white font-medium'
                        disabled={(page * limit) >= totalProducts}
                        onClick={() => {
                            if ((page * limit) >= totalProducts) return;
                            setPage((prev) => prev + 1);
                        }}
                        size={"lg"}
                    >
                        Next
                        <ArrowRightCircle className='size-4' />
                    </Button>
                </div>


                <p className='text-base font-medium dark:text-gray-300 text-gray-900'>
                    Showing {start}–{end} of {totalProducts} products
                </p>
            </div>

        </>

    )
}

export default Pagination