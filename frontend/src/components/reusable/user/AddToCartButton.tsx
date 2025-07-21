import { RequireAuth } from '@/components/layout/user/RequireAuthForAction'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/authContext'
import { useProductContext } from '@/context/productContext'
import { ShoppingCart } from 'lucide-react'
import { FC } from 'react'

type Props = {
    productId: string;
    quantity: number;
    stock: number
}

const AddToCartButton: FC<Props> = ({
    productId,
    quantity,
    stock
}) => {

    const { user } = useAuthContext();
    const { addToCart } = useProductContext();

    

    const handleAddToCart = async (productId: string, quantity: number) => {
        if (!user) return;
        await addToCart(productId, quantity)
    }
    return (
        <RequireAuth>
            <Button
                disabled={stock <= 0}
                onClick={() => handleAddToCart(productId, quantity)}
                className='rounded-none !pointer-events-auto disabled:!cursor-not-allowed text-base w-full'>
                Add to Cart <ShoppingCart strokeWidth={2.5} className='size-5' />
            </Button>
        </RequireAuth>
    )
}

export default AddToCartButton