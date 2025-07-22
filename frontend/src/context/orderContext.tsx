import { createContext, ReactNode, useContext, useState } from "react";
import { getConfirmedOrderDetails as getConfirmedOrderDetailsApi } from '@/API/userApi'
import { AxiosError } from "axios";
import { ApiErrorType, OrderLoading } from "@/types/main.types";
import { errorToast, successToast } from "@/utils/toastNotifications";

type OrderContextType = {
    getConfirmedOrderDetails: (orderId: string, navigate: (path: string) => void) => Promise<void>;
    loading: string | null
}

const OrderContext = createContext<OrderContextType | null>(null);

const OrderProvider = ({ children }: { children: ReactNode }) => {

    const [loading, setLoading] = useState<string | null>(null)



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



    return <OrderContext.Provider value={{
        getConfirmedOrderDetails,
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