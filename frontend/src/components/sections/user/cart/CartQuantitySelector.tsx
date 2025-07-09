import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ICartedProduct } from '@/types/main.types'
import { Minus, Plus } from 'lucide-react'
import { FC } from 'react'

type Props = {
    product: ICartedProduct;
    handleIncrement: (productId: string, product: ICartedProduct) => void;
    handleDecrement: (productId: string, product: ICartedProduct) => void;
    handleInputChange: (productId: string, value: string, product: ICartedProduct) => void;
    getCurrentQuantity: (productId: string) => number;
    handleUpdateQuantity: (productId: string) => void;
    quantityInputs: { [key: string]: string };
    newAddedQuantities: { [key: string]: number };
}

const CartQuantitySelector: FC<Props> = ({
    product,
    handleInputChange,
    handleIncrement,
    handleDecrement,
    getCurrentQuantity,
    handleUpdateQuantity,
    quantityInputs,
    newAddedQuantities
}) => {

    return (
        <div className="w-40">
            <div className='flex h-9 border-2 dark:text-white text-black rounded-md w-full'>
                <Button
                    size={"sm"}
                    variant={"secondary"}
                    onClick={() => handleIncrement(product._id, product)}
                    className='focus-visible:ring bg-transparent rounded-r-none h-full w-full flex items-center justify-center'
                    disabled={getCurrentQuantity(product._id) >= product.quantity}
                >
                    <Plus className='size-5 stroke-3 dark:text-orange-400 text-cyan-400' />
                </Button>
                <Separator orientation="vertical" />
                <div className='flex justify-center items-center w-full h-full'>
                    <input
                        type="text"
                        className="focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px] w-full h-full outline-none text-center font-semibold bg-transparent"
                        onChange={(e) => handleInputChange(product._id, e.target.value, product)}
                        value={quantityInputs[product._id] || product.cartedProductQunatity}
                    />
                </div>
                <Separator orientation="vertical" />
                <Button
                    size={"sm"}
                    variant={"secondary"}
                    onClick={() => handleDecrement(product._id, product)}
                    className='bg-transparent focus-visible:ring rounded-l-none h-full w-full flex items-center justify-center'
                    disabled={getCurrentQuantity(product._id) <= 1}
                >
                    <Minus className='size-5 stroke-3 dark:text-orange-400 text-cyan-400' />
                </Button>
            </div>

            {/* Update Button - Only show if quantity changed */}
            {newAddedQuantities[product._id] !== 0 && (
                <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-2 text-xs"
                    onClick={() => handleUpdateQuantity(product._id)}
                >
                    Update Quantity
                </Button>
            )}
        </div>
    )
}

export default CartQuantitySelector