import { ApiErrorType, IActivity } from "@/types/main.types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getRecentActivity as getRecentActivityApi } from "@/API/userApi";
import { AxiosError } from "axios";
import { errorToast } from "@/utils/toastNotifications";

type ActivityContextType = {
  getRecentActivity: (params: any) => Promise<IActivity[] | undefined>;
  setRecentActivityData: Dispatch<SetStateAction<IActivity[] | undefined>>;
  recentActivityData: IActivity[] | undefined;
  setPage: Dispatch<SetStateAction<number>>;
};

const ActivityContext = createContext<ActivityContextType | null>(null);

const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const [recentActivityData, setRecentActivityData] = useState<
    IActivity[] | undefined
  >(undefined);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const getRecentActivity = async (params: any) => {
    try {
      const res = await getRecentActivityApi(params);
      if (res.status === 200) {
        const activityData: IActivity[] = res.data.data;
        return activityData;
      }
      return undefined;
    } catch (error) {
      const err = error as AxiosError<ApiErrorType>;
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      const recentActivity = await getRecentActivity({ limit: 6 });
      if (recentActivity) {
        setRecentActivityData(recentActivity);
      }
    })();
  }, []);

  return (
    <ActivityContext.Provider
      value={{
        getRecentActivity,
        setRecentActivityData,
        recentActivityData,
        setPage,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

const useActivityContext = () => {
  const context = useContext(ActivityContext);
  if (!context)
    throw new Error(
      "useActivityContext must be used within a ActivityProvider",
    );
  return context;
};

export { useActivityContext, ActivityProvider };
