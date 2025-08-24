import {
  addProductIntoWishlistHelper,
  getWishListHelper,
  removeProductFromWishlistHelper,
} from "@/helpers/user/wishlist.helper";
import { QueryKeys, WishlistLoadingStates } from "@/types/main.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

const useWishlistQuery = () => {
  const queryClient = useQueryClient();

  //* Wishlist Related Queries And Mutations
  const useAddToWishlist = (
    setWishlistLoading: Dispatch<
      SetStateAction<Record<string, WishlistLoadingStates>>
    >,
  ) => {
    return useMutation({
      mutationFn: addProductIntoWishlistHelper,
      onMutate: ({ productId }) =>
        setWishlistLoading((prev) => ({
          ...prev,
          [productId]: WishlistLoadingStates.ADDING,
        })),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.GET_WISHLIST],
        });
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.FETCH_USER, "user"],
        });
      },
      onSettled: (_data, _error, { productId }) =>
        setWishlistLoading((prev) => ({
          ...prev,
          [productId]: WishlistLoadingStates.IDLE,
        })),
    });
  };

  const useRemoveFromWishlist = (
    setWishlistLoading: Dispatch<
      SetStateAction<Record<string, WishlistLoadingStates>>
    >,
  ) => {
    return useMutation({
      mutationFn: removeProductFromWishlistHelper,
      onMutate: ({ productId }) =>
        setWishlistLoading((prev) => ({
          ...prev,
          [productId]: WishlistLoadingStates.REMOVING,
        })),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.GET_WISHLIST],
        });
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.FETCH_USER, "user"],
        });
      },
      onSettled: (_data, _error, { productId }) =>
        setWishlistLoading((prev) => ({
          ...prev,
          [productId]: WishlistLoadingStates.IDLE,
        })),
    });
  };

  const useWishlist = () => {
    return useQuery({
      queryKey: [QueryKeys.GET_WISHLIST],
      queryFn: getWishListHelper,
      staleTime: Infinity,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(attemptIndex ** 2, 3000),
    });
  };

  return {
    useAddToWishlist,
    useRemoveFromWishlist,
    useWishlist,
  };
};

export { useWishlistQuery };
