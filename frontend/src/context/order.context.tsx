import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAllOrders as getAllOrdersApi,
  cancelOrder as cancelOrderApi,
  downloadOrderInvoice as downloadOrderInvoiceApi,
} from "@/API/userApi";
import { AxiosError } from "axios";
import {
  ApiErrorType,
  IOrder,
  OrderedProduct,
  OrderLoadingStates,
} from "@/types/main.types";
import { errorToast, successToast } from "@/utils/toastNotifications";
import { useOrderQuery } from "@/hooks/useOrderQuery";
import { UseQueryResult } from "@tanstack/react-query";

type OrderContextType = {
  orderLoading: OrderLoadingStates;
  proceedToCheckout: (navigate: (path: string) => void) => void;
  userTrackOrder: (orderId: string, navigate: (path: string) => void) => void;
  getAllOrders: (params?: any) => Promise<any>;
  ordersData: IOrder[];
  setOrdersData: Dispatch<SetStateAction<IOrder[]>>;
  pendingOrders: any[];
  cancelledOrders: any[];
  confirmedOrders: any[];
  cancelOrder: (orderId: string) => Promise<void>;
  ordersCount: number;
  downloadOrderInvoice: (
    orderId: string,
    products: OrderedProduct[],
  ) => Promise<void>;
};

const OrderContext = createContext<OrderContextType | null>(null);

const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orderLoading, setOrderLoading] = useState<OrderLoadingStates>(
    OrderLoadingStates.IDLE,
  );
  const [pendingOrders, setPendingOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [ordersData, setOrdersData] = useState<IOrder[]>([]);
  const [ordersCount, setOrdersCount] = useState(0);

  const { useProceedToCheckout, useUserTrackOrder } = useOrderQuery();
  const proceedToCheckoutMutation = useProceedToCheckout(setOrderLoading);
  const userTrackOrderMutation = useUserTrackOrder(setOrderLoading);

  const proceedToCheckout = (navigate: (path: string) => void) => {
    proceedToCheckoutMutation.mutate(navigate);
  };

  const userTrackOrder = (
    orderId: string,
    navigate: (path: string) => void,
  ) => {
    userTrackOrderMutation.mutate({
      navigate,
      orderId,
    });
  };

  const getAllOrders = async (params?: any) => {
    setOrderLoading(OrderLoadingStates.GET_ALL_ORDERS);
    try {
      const res = await getAllOrdersApi(params);

      if (res.status === 200) {
        const orders = res.data.data.orders;
        const ordersCount = res.data.data.ordersCount;
        setOrdersCount(ordersCount);
        const confirmedOrders = orders.filter(
          (o: any) => o.status === "confirmed",
        );
        const pendingOrders = orders.filter((o: any) => o.status === "pending");
        const cancelledOrders = orders.filter(
          (o: any) => o.status === "cancelled",
        );
        setConfirmedOrders(confirmedOrders);
        setPendingOrders(pendingOrders);
        setCancelledOrders(cancelledOrders);
        return orders;
      }
    } catch (error) {
      const err = error as AxiosError<ApiErrorType>;
      console.log(err);
    } finally {
      setOrderLoading(OrderLoadingStates.IDLE);
    }
  };

  useEffect(() => {
    console.log("Calling All Orders");

    getAllOrders();
  }, []);

  const cancelOrder = async (orderId: string) => {
    setOrderLoading(OrderLoadingStates.CANCEL_ORDER);
    try {
      const res = await cancelOrderApi(orderId);
      if (res.status === 200) {
        successToast(res.data.message);
      }
    } catch (error) {
      const err = error as AxiosError<ApiErrorType>;
      const errMsg = err.response?.data.message || "Something went wrong";
      errorToast(errMsg);
    } finally {
      setOrderLoading(OrderLoadingStates.IDLE);
    }
  };

  const downloadOrderInvoice = async (
    orderId: string,
    products: OrderedProduct[],
  ) => {
    setOrderLoading(OrderLoadingStates.DOWNLOAD_INVOICE);
    try {
      const res = await downloadOrderInvoiceApi(orderId, products);
      if (res.status === 200) {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice-${orderId}.pdf`);
        document.body.appendChild(link);
        link.click();

        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
        successToast("Invoice downloaded!");
      }
    } catch (error) {
      const err = error as AxiosError<ApiErrorType>;
      const errMsg = err.response?.data.message || "Something went wrong";
      errorToast(errMsg);
    } finally {
      setOrderLoading(OrderLoadingStates.IDLE);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orderLoading,
        proceedToCheckout,
        userTrackOrder,
        getAllOrders,
        pendingOrders,
        cancelledOrders,
        confirmedOrders,
        cancelOrder,
        downloadOrderInvoice,
        setOrdersData,
        ordersData,
        ordersCount,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context)
    throw new Error("useOrderContext must be used within a OrderProvider");
  return context;
};

export { OrderProvider, useOrderContext };
