import { useWishlistQuery } from "@/hooks/useWishlistQuery";
import { WishlistLoadingStates } from "@/types/main.types";
import { UseQueryResult } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type WishlistContextType = {
  addProductIntoWishlist: (productId: string) => void;
  removeProductFromWishlist: (productId: string) => void;
  useWishlist: () => UseQueryResult<string[] | null, Error>;
  wishlist: string[];
  setWishlist: Dispatch<SetStateAction<string[]>>;
  wishlistLoading: Record<string, WishlistLoadingStates>;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState<
    Record<string, WishlistLoadingStates>
  >({});

  const { useAddToWishlist, useRemoveFromWishlist, useWishlist } =
    useWishlistQuery();

  const addProductIntoWishlistMutation = useAddToWishlist(setWishlistLoading); //* Add Product into wishlist Mutation
  const removeProductFromWishlistMutation =
    useRemoveFromWishlist(setWishlistLoading); //* Remove Product from wishlist Mutation

  //* Wishlist Related Functions

  const addProductIntoWishlist = (productId: string) => {
    addProductIntoWishlistMutation.mutate({
      productId,
      setWishlist,
    });
  };

  const removeProductFromWishlist = (productId: string) => {
    removeProductFromWishlistMutation.mutate({
      productId,
      setWishlist,
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        addProductIntoWishlist,
        removeProductFromWishlist,
        useWishlist,
        wishlist,
        setWishlist,
        wishlistLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error(
      "useWishlistContext must be used within a WishlistProvider",
    );
  return context;
};

export { WishlistProvider, useWishlistContext };
