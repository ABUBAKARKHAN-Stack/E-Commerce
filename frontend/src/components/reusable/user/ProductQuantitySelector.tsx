import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus } from 'lucide-react';
import { Dispatch, FC, SetStateAction, useState } from 'react'

type Props = {
    productQuantity: number;
    quantityCount: number;
    setQuantityCount: Dispatch<SetStateAction<number>>
}

const ProductQuantitySelector: FC<Props> = ({
    productQuantity,
    quantityCount,
    setQuantityCount
}) => {


    

    return (
        <div className='flex h-9 border-2 dark:text-white text-black rounded-md w-full'>
            <Button
                size={"sm"}
                variant={"secondary"}
                className='focus-visible:ring bg-transparent rounded-r-none h-full w-full flex items-center justify-center'
                onClick={() => {
                    if (productQuantity > quantityCount) setQuantityCount((prev) => prev = prev + 1);
                }}
                disabled={quantityCount >= productQuantity}
            ><Plus className='size-5 stroke-3 dark:text-orange-400 text-cyan-400' /></Button>
            <Separator orientation="vertical" />
            <div className='flex justify-center items-center w-full h-full'>
                <span className='block text-base font-semibold'>{quantityCount}</span>
            </div>
            <Separator orientation="vertical" />
            <Button
                size={"sm"}
                variant={"secondary"}
                className='bg-transparent focus-visible:ring rounded-l-none h-full w-full flex items-center justify-center'
                disabled={quantityCount === 1}
                onClick={() => {
                    if (quantityCount <= 1) return;
                    setQuantityCount((prev) => prev = prev - 1)
                }}
            ><Minus className='size-5 stroke-3 dark:text-orange-400 text-cyan-400' /></Button>
        </div>
    )
}

export default ProductQuantitySelector