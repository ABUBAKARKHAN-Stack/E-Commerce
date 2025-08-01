import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

type Props = {
  productQuantity: number;
  quantityCount: number;
  setQuantityCount: Dispatch<SetStateAction<number>>;
};

const ProductQuantitySelector: FC<Props> = ({
  productQuantity,
  setQuantityCount,
}) => {
  const [quantityInput, setQuantityInput] = useState(1);

  useEffect(() => {
    if (quantityInput >= 1 && quantityInput <= productQuantity) {
      setQuantityCount(quantityInput);
    }
  }, [quantityInput]);

  return (
    <div className="flex h-9.5 w-full rounded-xl border-2 text-black dark:text-white">
      <Button
        className="flex h-full w-full items-center justify-center rounded-r-none focus-visible:ring disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-70"
        onClick={() => {
          if (productQuantity > quantityInput)
            setQuantityInput((prev) => (prev = prev + 1));
        }}
        disabled={quantityInput >= productQuantity}
      >
        <Plus className="size-5 stroke-3 text-white" />
      </Button>
      <Separator orientation="vertical" />
      <div className="flex h-full w-full items-center justify-center">
        <input
          type="text"
          className="focus-visible:border-ring focus-visible:ring-ring/50 h-full w-full text-center font-semibold outline-none focus-visible:ring-[2px]"
          value={quantityInput}
          onChange={(e) => {
            const value = +e.target.value;
            if (value <= productQuantity) {
              setQuantityInput(value);
            }
          }}
        />
      </div>
      <Separator orientation="vertical" />
      <Button
        className="flex h-full w-full items-center justify-center rounded-l-none focus-visible:ring disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-70"
        disabled={quantityInput === 1}
        onClick={() => {
          if (quantityInput <= 1) return;
          setQuantityInput((prev) => (prev = prev - 1));
        }}
      >
        <Minus className="size-5 stroke-3 text-white" />
      </Button>
    </div>
  );
};

export default ProductQuantitySelector;
