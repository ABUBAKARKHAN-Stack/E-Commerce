import { ButtonLoader } from "@/components/Skeleton&Loaders/loaders";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ICartedProduct } from "@/types/main.types";
import { Minus, Plus } from "lucide-react";
import { FC } from "react";

type Props = {
  product: ICartedProduct;
  handleIncrement: (productId: string, product: ICartedProduct) => void;
  handleDecrement: (productId: string, product: ICartedProduct) => void;
  handleInputChange: (
    productId: string,
    value: string,
    product: ICartedProduct,
  ) => void;
  getCurrentQuantity: (productId: string) => number;
  handleUpdateQuantity: (productId: string) => void;
  quantityInputs: { [key: string]: string };
  newAddedQuantities: { [key: string]: number };
  updateCartLoading: boolean;
};

const CartQuantitySelector: FC<Props> = ({
  product,
  handleInputChange,
  handleIncrement,
  handleDecrement,
  getCurrentQuantity,
  handleUpdateQuantity,
  quantityInputs,
  newAddedQuantities,
  updateCartLoading,
}) => {
  return (
    <div className="w-40">
      <div className="flex h-9 w-full rounded-md border-2 text-black dark:text-white">
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={() => handleIncrement(product._id, product)}
          className="flex h-full w-full items-center justify-center rounded-r-none bg-transparent focus-visible:ring"
          disabled={getCurrentQuantity(product._id) >= product.quantity}
        >
          <Plus className="size-5 stroke-3 text-cyan-400 dark:text-orange-400" />
        </Button>
        <Separator orientation="vertical" />
        <div className="flex h-full w-full items-center justify-center">
          <input
            type="text"
            className="focus-visible:border-ring focus-visible:ring-ring/50 h-full w-full bg-transparent text-center font-semibold outline-none focus-visible:ring-[2px]"
            onChange={(e) =>
              handleInputChange(product._id, e.target.value, product)
            }
            value={quantityInputs[product._id] || product.cartedProductQuantity}
          />
        </div>
        <Separator orientation="vertical" />
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={() => handleDecrement(product._id, product)}
          className="flex h-full w-full items-center justify-center rounded-l-none bg-transparent focus-visible:ring"
          disabled={getCurrentQuantity(product._id) <= 1}
        >
          <Minus className="size-5 stroke-3 text-cyan-400 dark:text-orange-400" />
        </Button>
      </div>

      {/* Update Button - Only show if quantity changed */}

      {newAddedQuantities[product._id] !== 0 && (
        <Button
          size="sm"
          variant="outline"
          className="mt-2 w-full text-xs"
          onClick={() => handleUpdateQuantity(product._id)}
          disabled={updateCartLoading}
        >
          {updateCartLoading ? (
            <ButtonLoader size="size-4" loaderText="Updating Quantity..." />
          ) : (
            "Update Quantity"
          )}
        </Button>
      )}
    </div>
  );
};

export default CartQuantitySelector;
