import { useCartQuantityHandler } from "@/hooks/useCartQuantityHandler";
import { FC } from "react";

import CartCard from "./CartCard";
import { ICartedProduct } from "@/types/main.types";

type Props = {
  products: ICartedProduct[];
};

const CartCards: FC<Props> = ({ products }) => {
  const {
    handleIncrement,
    handleDecrement,
    handleInputChange,
    getCurrentQuantity,
    getSubtotal,
    quantityInputs,
    newAddedQuantities,
  } = useCartQuantityHandler(products);

  return (
    <div className="shadow-6px grid grid-cols-1 rounded shadow-black">
      {products.map((p) => (
        <CartCard
          p={p}
          key={p._id}
          getCurrentQuantity={getCurrentQuantity}
          getSubtotal={getSubtotal}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          handleInputChange={handleInputChange}
          newAddedQuantities={newAddedQuantities}
          quantityInputs={quantityInputs}
        />
      ))}
    </div>
  );
};

export default CartCards;
