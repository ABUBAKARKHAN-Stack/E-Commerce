import { ToolTip } from "../shared";
import { RequireAuth } from "@/components/layout/user/RequireAuthForAction";
import { FC, useEffect, useState } from "react";
import { IUser } from "@/types/main.types";
import WishlistButton from "@/components/ui/wishlist-button";
import { Eye, HeartIcon } from "lucide-react";
import { ViewProduct } from "@/components/sections/user";

type Props = {
  productId: string;
  user: IUser;
  wishlist: string[];
  usingLoaderData?: boolean;
};

const ProductCardHeaderButtons: FC<Props> = ({
  productId,
  user,
  wishlist,
  usingLoaderData = false,
}) => {
  const [isInWishList, setIsInWishList] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    setIsInWishList(wishlist?.includes(productId));
  }, [wishlist, productId]);

  return (
    <div className="absolute top-2 left-1 z-10 flex flex-col gap-y-1.5 opacity-100 transition-opacity duration-300 ease-linear lg:opacity-0 lg:group-hover:opacity-100">
      <RequireAuth>
        <WishlistButton
          icon={<HeartIcon size={18} />}
          isInWishList={wishlist?.includes(productId)}
          productId={productId}
          userLoggedIn={!!user}
          usingLoaderData={usingLoaderData}
        />
      </RequireAuth>
      <ToolTip
        triggerValue={
          <button
            onClick={() => setIsViewing(true)}
            className="flex size-7 cursor-pointer items-center justify-center rounded-full bg-black text-white shadow-black transition-all duration-300 ease-in-out hover:scale-105 hover:bg-cyan-500 hover:text-white hover:shadow-cyan-500 dark:bg-white dark:text-black dark:shadow-white hover:dark:bg-orange-500 hover:dark:text-white dark:hover:shadow-orange-500"
          >
            <Eye size={18} className="m-auto" />
          </button>
        }
        tooltip="View Details"
      />
      {isViewing && (
        <ViewProduct
          isOpen={isViewing}
          onOpenChange={setIsViewing}
          productId={productId}
        />
      )}
    </div>
  );
};

export default ProductCardHeaderButtons;
