import { RequireAuth } from "@/components/layout/user/RequireAuthForAction";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth.context";
import { useProductContext } from "@/context/product.context";
import { CartLoadingStates } from "@/types/main.types";
import { ShoppingCart } from "lucide-react";
import { FC } from "react";
import { ButtonLoader } from "@/components/Skeleton&Loaders/loaders";
import { useCartContext } from "@/context/cart.context";

type Props = {
  productId: string;
  quantity: number;
  stock: number;
};

const AddToCartButton: FC<Props> = ({ productId, quantity, stock }) => {
  const { user } = useAuthContext();
  const { addToCart, cartLoading } = useCartContext();
  const addToCartLoading = cartLoading[productId] === CartLoadingStates.ADDING;

  const handleAddToCart = (productId: string, quantity: number) => {
    if (!user) return;
    addToCart(productId, quantity);
  };

  return (
    <RequireAuth>
      <Button
        disabled={stock <= 0 || addToCartLoading}
        onClick={() => handleAddToCart(productId, quantity)}
        className="!pointer-events-auto w-full rounded-none text-base"
      >
        {addToCartLoading ? (
          <ButtonLoader row_reverse loaderText="Adding to Cart..." />
        ) : (
          <>
            {" "}
            Add to Cart <ShoppingCart strokeWidth={2.5} className="size-5" />
          </>
        )}
      </Button>
    </RequireAuth>
  );
};

export default AddToCartButton;
