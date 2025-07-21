import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus } from 'lucide-react';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

type Props = {
    productQuantity: number;
    quantityCount: number;
    setQuantityCount: Dispatch<SetStateAction<number>>
}

const ProductQuantitySelector: FC<Props> = ({
    productQuantity,
    setQuantityCount
}) => {


    const [quantityInput, setQuantityInput] = useState(1);

    useEffect(() => {
        if (quantityInput >= 1 && quantityInput <= productQuantity) {
            setQuantityCount(quantityInput);
        }
    }, [quantityInput])


    return (
        <div className='flex h-9.5 border-2 dark:text-white text-black rounded-xl w-full'>
            <Button
                className='focus-visible:ring disabled:opacity-70 disabled:pointer-events-auto disabled:cursor-not-allowed rounded-r-none h-full w-full flex items-center justify-center'
                onClick={() => {
                    if (productQuantity > quantityInput) setQuantityInput((prev) => prev = prev + 1);
                }}
                disabled={quantityInput >= productQuantity}
            ><Plus className='size-5 stroke-3 text-white' /></Button>
            <Separator orientation="vertical" />
            <div className='flex justify-center items-center w-full h-full'>
                <input
                    type="text"
                    className="focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px] w-full h-full outline-none text-center font-semibold"
                    value={quantityInput}
                    onChange={(e) => {
                        const value = +e.target.value
                        if (value <= productQuantity) {
                            setQuantityInput(value)
                        }
                    }}
                />
            </div>
            <Separator orientation="vertical" />
            <Button
                className='focus-visible:ring disabled:opacity-70 disabled:pointer-events-auto disabled:cursor-not-allowed rounded-l-none h-full w-full flex items-center justify-center'
                disabled={quantityInput === 1}
                onClick={() => {
                    if (quantityInput <= 1) return;
                    setQuantityInput((prev) => prev = prev - 1)
                }}
            ><Minus className='size-5 stroke-3 text-white' /></Button>
        </div>
    )
}

export default ProductQuantitySelector