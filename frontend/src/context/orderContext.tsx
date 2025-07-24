import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
    getConfirmedOrderDetails as getConfirmedOrderDetailsApi,
    getAllOrders as getAllOrdersApi
} from '@/API/userApi'
import { AxiosError } from "axios";
import { ApiErrorType, OrderLoading } from "@/types/main.types";
import { errorToast, successToast } from "@/utils/toastNotifications";

type OrderContextType = {
    getConfirmedOrderDetails: (orderId: string, navigate: (path: string) => void) => Promise<void>;
    getAllOrders: () => Promise<void>;
    pendingOrders: any[];
    cancelledOrders: any[];
    confirmedOrders: any[];
    totalOrders: any[];
    loading: string | null
}

const OrderContext = createContext<OrderContextType | null>(null);

const OrderProvider = ({ children }: { children: ReactNode }) => {

    const [loading, setLoading] = useState<string | null>(null);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [cancelledOrders, setCancelledOrders] = useState([]);
    const [confirmedOrders, setConfirmedOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState([]);


    const getConfirmedOrderDetails = async (orderId: string, navigate: (path: string) => void) => {
        try {
            setLoading(OrderLoading.TRACK_ORDER_LOADING);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const res = await getConfirmedOrderDetailsApi(orderId);

            if (res.status === 200) {
                successToast(res.data.message);
                navigate(`/track-order?orderId=${res.data.data.orderId}`);
            }

        } catch (error) {
            const err = error as AxiosError<ApiErrorType>;
            const errMsg = err.response?.data.message || "Something went wrong";
            errorToast(errMsg);
        } finally {
            setLoading(null);
        }
    };

    const getAllOrders = async () => {
        setLoading(OrderLoading.GET_ALL_ORDERS)
        try {
            const res = await getAllOrdersApi();
            if (res.status === 200) {
                const orders = res.data.data;
                const confirmedOrders = orders.filter((o: any) => o.status === 'confirmed');
                const pendingOrders = orders.filter((o: any) => o.status === 'pending');
                const cancelledOrders = orders.filter((o: any) => o.status === 'cancelled');
                setConfirmedOrders(confirmedOrders)
                setPendingOrders(pendingOrders);
                setCancelledOrders(cancelledOrders);
                setTotalOrders(orders)
            }

        } catch (error) {
            const err = error as AxiosError<ApiErrorType>;
            const errMsg = err.response?.data.message || "Something went wrong";
            errorToast(errMsg);
        } finally {
            setLoading(null)
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])




    return <OrderContext.Provider value={{
        getConfirmedOrderDetails,
        getAllOrders,
        pendingOrders,
        cancelledOrders,
        confirmedOrders,
        totalOrders,
        loading
    }}>
        {children}
    </OrderContext.Provider>
}


const useOrderContext = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error("useOrderContext must be used within a OrderProvider");
    return context;
}

export {
    OrderProvider,
    useOrderContext
}