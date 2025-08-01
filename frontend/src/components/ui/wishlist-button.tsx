import { X } from "lucide-react";
import { FC } from "react";
import { useProductContext } from "@/context/productContext";
import { ToolTip } from "@/components/reusable/shared";
import { useRevalidator } from "react-router-dom";

type Props = {
  productId: string;
  icon: React.ReactNode;
  isInWishList: boolean;
  userLoggedIn: boolean;
  usingLoaderData?: boolean;
};

const WishlistButton: FC<Props> = ({
  productId,
  icon,
  isInWishList,
  userLoggedIn,
}) => {
  const { addProductIntoWishlist, removeProductFromWishlist } =
    useProductContext();
  const { revalidate } = useRevalidator();

  const handleAddToWishlist = () => {
    if (!userLoggedIn || isInWishList) return;
    addProductIntoWishlist(productId);
  };

  const handleRemoveFromWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeProductFromWishlist(productId, revalidate);
  };

  return (
    <ToolTip
      tooltip={isInWishList ? "Remove from Wishlist" : "Add to Wishlist"}
      triggerValue={
        <span>
          <button
            onClick={handleAddToWishlist}
            disabled={isInWishList}
            className={`relative flex size-7 items-center justify-center rounded-full text-white transition-all duration-300 ease-in-out ${
              isInWishList
                ? "cursor-default bg-cyan-500 shadow-cyan-500 dark:bg-orange-500 dark:shadow-orange-500"
                : "cursor-pointer bg-black shadow-black hover:bg-cyan-500 hover:shadow-cyan-500 dark:bg-white dark:text-black dark:shadow-white hover:dark:bg-orange-500 hover:dark:text-white dark:hover:shadow-orange-500"
            }`}
          >
            {icon}
          </button>
          {isInWishList && (
            <button
              onClick={handleRemoveFromWishlist}
              className="absolute -top-1.5 -right-1.5 z-10 flex size-4 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600"
            >
              <X className="size-2.5 stroke-[3]" />
            </button>
          )}
        </span>
      }
    />
  );
};

export default WishlistButton;
