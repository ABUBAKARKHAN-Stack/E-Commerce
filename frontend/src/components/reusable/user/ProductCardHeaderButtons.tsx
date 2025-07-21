import { ToolTip } from "../shared";
import {
  RequireAuth
} from "@/components/layout/user/RequireAuthForAction";
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
}

const ProductCardHeaderButtons: FC<Props> = ({ productId, user, wishlist, usingLoaderData = false }) => {
  const [isInWishList, setIsInWishList] = useState(false);
  const [isViewing, setIsViewing] = useState(false);



  useEffect(() => {
    setIsInWishList(wishlist?.includes(productId));
  }, [wishlist, productId])

  return (


    <div className='flex lg:group-hover:opacity-100 lg:opacity-0 opacity-100 transition-opacity ease-linear duration-300 absolute left-1 top-2 z-10 flex-col gap-y-1.5'>
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
            className="flex items-center justify-center size-7 rounded-full text-white transition-all duration-300 ease-in-out dark:bg-white hover:dark:bg-orange-500 dark:text-black hover:dark:text-white bg-black hover:bg-cyan-500 hover:text-white shadow-black dark:shadow-white hover:shadow-cyan-500 dark:hover:shadow-orange-500 hover:scale-105 cursor-pointer"
          >
            <Eye size={18} className='m-auto' />
          </button>
        }
        tooltip="View Details"
      />
      {isViewing && <ViewProduct
        isOpen={isViewing}
        onOpenChange={setIsViewing}
        productId={productId}
      />}
    </div>
  )
}

export default ProductCardHeaderButtons;
