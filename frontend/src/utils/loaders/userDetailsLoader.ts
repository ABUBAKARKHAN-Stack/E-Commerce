import { getUser } from "@/API/userApi";
import { ApiErrorType, IUser } from "@/types/main.types";
import { AxiosError } from "axios";
import { redirect } from "react-router-dom";
import { ApiError } from "../ApiError";

const userDetailsLoader = async () => {
  try {
    const res = await getUser();
    if (res.status === 200) {
      const user: IUser = res.data.data;
      return user;
    }
    throw new ApiError(res.status, "Unexpected response from user API");
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    const errStatus = err.response?.status || 500;
    const errMsg = err.response?.data.message || "Something went wrong";
    if (errStatus === 401 || errStatus === 403) {
      return redirect("/sign-in");
    }
    throw new ApiError(errStatus, errMsg, err.response?.data);
  }
};

export { userDetailsLoader };
