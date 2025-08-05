import { AdminOrderLoading, ApiErrorType, IOrder } from "@/types/main.types";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState
} from "react";
import {
    getAllOrders as getAllOrdersApi,
    getSingleOrder as getSingleOrderApi,
    markOrderAsProcessing as markOrderAsProcessingApi,
    markOrderAsShipped as markOrderAsShippedApi,
    markOrderAsDelivered as markOrderAsDeliveredApi,
} from '@/API/adminApi'
import { AxiosError } from "axios";
import { errorToast, successToast } from "@/utils/toastNotifications";



type AdminOrderContextType = {
    loading: string | null;
    getAllOrders: (queryParams?: any) => Promise<void>;
    orders: IOrder[] | [];
    setOrders: Dispatch<SetStateAction<IOrder[] | []>>;
    markOrderAsProcessing: (orderId: string, revalidate: () => void) => Promise<void>;
    markOrderAsShipped: (orderId: string, revalidate: () => void) => Promise<void>;
    markOrderAsDelivered: (orderId: string, revalidate: () => void) => Promise<void>;
    totalOrders: number | null;


}

const AdminOrderContext = createContext<AdminOrderContextType | null>(null);

const AdminOrderProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<string | null>(null);
    const [orders, setOrders] = useState<IOrder[] | []>([]);
    const [totalOrders, setTotalOrders] = useState(null)

    const getAllOrders = async (queryParams?: any) => {
        setLoading(AdminOrderLoading.GET_ALL_ORDERS)
        try {
            const res = await getAllOrdersApi(queryParams);
            if (res.status === 200) {
                setOrders(res.data.data?.orders || []);
                setTotalOrders(res.data.data?.totalOrders || null)
            }
        } catch (error) {
            const err = error as AxiosError<ApiErrorType>
            console.log(err);
        } finally {
            setTimeout(() => {
                setLoading(null)
            }, 1000);
        }
    }

    const getSingleOrder = async (orderId: string) => {
        setLoading(AdminOrderLoading.GET_SINGLE_ORDER)
        try {
            const res = await getSingleOrderApi(orderId);
            if (res.status === 200) {
                console.log(res.data.data);
            }
        } catch (error) {
            const err = error as AxiosError<ApiErrorType>
            console.log(err);
        } finally {
            setLoading(null)
        }
    }

    const markOrderAsProcessing = async (orderId: string, revalidate: () => void) => {
        setLoading(AdminOrderLoading.MARK_AS_PROCESSING)
        try {
            const res = await markOrderAsProcessingApi(orderId);
            if (res.status === 200) {
                successToast(res.data.message);
                revalidate()
            }
        } catch (error) {
            const err = error as AxiosError<ApiErrorType>
            const errMsg = err.response?.data.message || "Something went wrong";
            errorToast(errMsg)

        } finally {
            setLoading(null)
        }
    }

    const markOrderAsShipped = async (orderId: string, revalidate: () => void) => {
        setLoading(AdminOrderLoading.MARK_AS_SHIPPIED)
        try {
            const res = await markOrderAsShippedApi(orderId);
            if (res.status === 200) {
                successToast(res.data.message)
                revalidate()
            }
        } catch (error) {
            const err = error as AxiosError<ApiErrorType>
            const errMsg = err.response?.data.message || "Something went wrong";
            errorToast(errMsg)

        } finally {
            setLoading(null)
        }
    }

    const markOrderAsDelivered = async (orderId: string, revalidate: () => void) => {
        setLoading(AdminOrderLoading.MARK_AS_DELIVERED)
        try {
            const res = await markOrderAsDeliveredApi(orderId);
            if (res.status === 200) {
                successToast(res.data.message)
                revalidate()
            }
        } catch (error) {
            const err = error as AxiosError<ApiErrorType>
            const errMsg = err.response?.data.message || "Something went wrong";
            errorToast(errMsg)

        } finally {
            setLoading(null)
        }
    }



    return (
        <AdminOrderContext.Provider
            value={{
                loading,
                getAllOrders,
                orders,
                setOrders,
                markOrderAsProcessing,
                markOrderAsShipped,
                markOrderAsDelivered,
                totalOrders
            }}
        >
            {children}
        </AdminOrderContext.Provider>
    )
}

const useAdminOrderContext = () => {
    const context = useContext(AdminOrderContext);
    if (!context) throw new Error(
        "useAdminOrderContext must be used within a AdminOrderProvider",
    );
    return context
}

export {
    AdminOrderProvider,
    useAdminOrderContext
}