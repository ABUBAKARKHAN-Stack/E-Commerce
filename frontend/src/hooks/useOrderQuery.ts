import { ApiErrorType, OrderLoadingStates } from "@/types/main.types";
import { useMutation } from "@tanstack/react-query";
import {
  proceedToCheckoutHelper,
  userTrackOrderHelper,
} from "@/helpers/user/orders.helper";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

const useOrderQuery = () => {
  const useProceedToCheckout = (
    setOrderLoading: Dispatch<SetStateAction<OrderLoadingStates>>,
  ) => {
    return useMutation({
      mutationFn: proceedToCheckoutHelper,
      onMutate: () => setOrderLoading(OrderLoadingStates.PROCEED_TO_CHECKOUT),
      onSettled: () => setOrderLoading(OrderLoadingStates.IDLE),
    });
  };

  const useUserTrackOrder = (
    setOrderLoading: Dispatch<SetStateAction<OrderLoadingStates>>,
  ) => {
    return useMutation({
      mutationFn: userTrackOrderHelper,
      onMutate: () => setOrderLoading(OrderLoadingStates.TRACK_ORDER),
      onSettled: () => setOrderLoading(OrderLoadingStates.IDLE),
    });
  };

  return {
    useProceedToCheckout,
    useUserTrackOrder,
  };
};

export { useOrderQuery };
