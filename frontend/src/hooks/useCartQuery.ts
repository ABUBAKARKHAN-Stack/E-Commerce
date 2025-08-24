import {
  addToCartHelper,
  getCartDetailsHelper,
  removeFromCartHelper,
  updateCartHelper,
} from "@/helpers/user/cart.helper";
import { CartLoadingStates, QueryKeys } from "@/types/main.types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

const useCartQuery = () => {
  const queryClient = useQueryClient();

  //* Cart Related Queries And Mutations

  const useAddToCart = (
    setCartLoading: Dispatch<SetStateAction<Record<string, CartLoadingStates>>>,
  ) => {
    return useMutation({
      mutationFn: addToCartHelper,
      onMutate: ({ productId }) =>
        setCartLoading((prev) => ({
          ...prev,
          [productId]: CartLoadingStates.ADDING,
        })),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.GET_CART],
        });
      },
      onSettled: (_data, _error, { productId }) =>
        setCartLoading((prev) => ({
          ...prev,
          [productId]: CartLoadingStates.IDLE,
        })),
    });
  };

  const useUpdateCart = (
    setCartLoading: Dispatch<SetStateAction<Record<string, CartLoadingStates>>>,
  ) => {
    return useMutation({
      mutationFn: updateCartHelper,
      onMutate: ({ productId }) =>
        setCartLoading((prev) => ({
          ...prev,
          [productId]: CartLoadingStates.UPDATING,
        })),
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.GET_CART],
          });
        }, 100);
      },
      onSettled: (_data, _errro, { productId }) =>
        setCartLoading((prev) => ({
          ...prev,
          [productId]: CartLoadingStates.IDLE,
        })),
    });
  };

  const useRemoveFromCart = (
    setCartLoading: Dispatch<SetStateAction<Record<string, CartLoadingStates>>>,
  ) => {
    return useMutation({
      mutationFn: removeFromCartHelper,
      onMutate: (productId) =>
        setCartLoading((prev) => ({
          ...prev,
          [productId]: CartLoadingStates.REMOVING,
        })),
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.GET_CART],
          });
        }, 100);
      },
      onSettled: (_data, _error, productId) =>
        setCartLoading((prev) => ({
          ...prev,
          [productId]: CartLoadingStates.IDLE,
        })),
    });
  };

  const useCartDetails = () => {
    return useQuery({
      queryKey: [QueryKeys.GET_CART],
      queryFn: getCartDetailsHelper,
      staleTime: Infinity,
      gcTime: 30 * 60 * 1000,
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(attemptIndex ** 2, 3000),
    });
  };

  return {
    useAddToCart,
    useUpdateCart,
    useRemoveFromCart,
    useCartDetails,
  };
};

export { useCartQuery };
