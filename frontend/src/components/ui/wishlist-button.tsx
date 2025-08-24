import { X, Loader2 } from "lucide-react";
import { FC } from "react";
import { ToolTip } from "@/components/reusable/shared";
import { WishlistLoadingStates } from "@/types/main.types";
import { useWishlistContext } from "@/context/wishlist.context";

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
  const { addProductIntoWishlist, removeProductFromWishlist, wishlistLoading } =
    useWishlistContext();

  const addProductIntoWishlistLoading =
    wishlistLoading[productId] === WishlistLoadingStates.ADDING;
  const removeProductFromWishlistLoading =
    wishlistLoading[productId] === WishlistLoadingStates.REMOVING;
  const isLoading =
    addProductIntoWishlistLoading || removeProductFromWishlistLoading;

  const handleAddToWishlist = () => {
    if (!userLoggedIn || isInWishList || isLoading) return;
    addProductIntoWishlist(productId);
  };

  const handleRemoveFromWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (removeProductFromWishlistLoading) return;
    removeProductFromWishlist(productId);
  };

  const getTooltipText = () => {
    if (addProductIntoWishlistLoading) return "Adding to Wishlist...";
    if (removeProductFromWishlistLoading) return "Removing from Wishlist...";
    return isInWishList ? "Remove from Wishlist" : "Add to Wishlist";
  };

  return (
    <ToolTip
      tooltip={getTooltipText()}
      triggerValue={
        <span className="relative">
          <button
            onClick={handleAddToWishlist}
            disabled={isInWishList || isLoading}
            className={`relative flex size-7 items-center justify-center rounded-full text-white transition-all duration-300 ease-in-out disabled:opacity-50 ${
              isInWishList
                ? "cursor-default bg-cyan-500 shadow-cyan-500 dark:bg-orange-500 dark:shadow-orange-500"
                : "cursor-pointer bg-black shadow-black hover:bg-cyan-500 hover:shadow-cyan-500 dark:bg-white dark:text-black dark:shadow-white hover:dark:bg-orange-500 hover:dark:text-white dark:hover:shadow-orange-500"
            } ${isLoading ? "pointer-events-none" : ""}`}
          >
            {addProductIntoWishlistLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              icon
            )}

            {addProductIntoWishlistLoading && (
              <div className="absolute inset-0 animate-pulse rounded-full bg-white/20" />
            )}
          </button>

          {isInWishList && !addProductIntoWishlistLoading && (
            <button
              disabled={removeProductFromWishlistLoading}
              onClick={handleRemoveFromWishlist}
              className={`absolute -top-1.5 -right-1.5 z-10 flex size-4 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-all duration-200 ${
                removeProductFromWishlistLoading
                  ? "cursor-not-allowed opacity-75"
                  : "cursor-pointer hover:scale-110 hover:bg-red-600"
              }`}
            >
              {removeProductFromWishlistLoading ? (
                <Loader2 className="size-2 animate-spin stroke-[3]" />
              ) : (
                <X className="size-2.5 stroke-[3]" />
              )}
            </button>
          )}

          {removeProductFromWishlistLoading && (
            <div className="absolute inset-0 rounded-full bg-black/10 dark:bg-white/10" />
          )}
        </span>
      }
    />
  );
};

export default WishlistButton;
