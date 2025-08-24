import {
  ApiErrorType,
  IAdmin,
  IUser,
  LoginPayload,
  RoleType,
} from "@/types/main.types";
import {
  forgotPasswordUser,
  getUser,
  loginUser,
  logoutUser,
  resetPasswordUser,
  updateUserPassword,
  updateUserProfile,
} from "@/API/userApi";
import {
  forgotPasswordAdmin,
  getAdmin,
  loginAdmin,
  logoutAdmin,
  resetPasswordAdmin,
  updateAdminPassword,
  updateAdminProfile,
} from "@/API/adminApi";
import { AxiosError } from "axios";

import {
  errorToast,
  infoToast,
  successToast,
} from "@/utils/toastNotifications";
import { ApiError } from "@/utils/ApiError";
import { Dispatch, RefObject, SetStateAction } from "react";
import { z } from "zod";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/schemas/authSchema";
import {
  updatePasswordSchema,
  updateProfileSchema,
} from "@/schemas/update-ProfileSchema";
import { queryClient } from "@/utils/tanstackQueryClient";

const loginHelper = async ({
  isAdmin,
  data,
  isUsingInAuthDialog,
  navigate,
  setRole,
}: LoginPayload): Promise<void> => {
  if (!setRole) throw new ApiError(400, "setRole is required");

  try {
    const res = isAdmin ? await loginAdmin(data) : await loginUser(data);

    if (isAdmin && res.data.data.adminToken) {
      localStorage.setItem("adminToken", res.data.data.adminToken);
      setRole("admin");
      navigate("/admin/dashboard");
    } else if (res.data.data.userToken) {
      localStorage.setItem("userToken", res.data.data.userToken);
      setRole("user");
      if (isUsingInAuthDialog) {
        successToast("User Logged in Successfully");
        return;
      }
      navigate("/");
    } else {
      infoToast("Something went wrong");
    }
  } catch (error: any) {
    const err = error as AxiosError<ApiErrorType>;
    const errMsg = err.response?.data.message || "Login failed";
    errorToast(errMsg);
    throw err;
  }
};

type LogoutType = {
  role: RoleType;
  setRole: Dispatch<SetStateAction<RoleType>>;
  navigate: (path: string) => void;
  setUser: Dispatch<SetStateAction<IUser | IAdmin | null>>;
};

const logoutHelper = async ({
  role,
  setRole,
  setUser,
  navigate,
}: LogoutType) => {
  try {
    if (role === "user") {
      const res = await logoutUser();
      if (res.data.success) {
        queryClient.clear();
        localStorage.removeItem("REACT_QUERY_OFFLINE_CACHE");
        localStorage.removeItem("userToken");
        setUser(null);
        setRole(null);
        successToast(res.data.message);
        navigate("/sign-in");
        console.log("User Logged Out");
      }
    } else if (role === "admin") {
      const res = await logoutAdmin();
      if (res.data.success) {
        queryClient.clear();
        localStorage.removeItem("REACT_QUERY_OFFLINE_CACHE");
        localStorage.removeItem("adminToken");
        setUser(null);
        setRole(null);
        successToast(res.data.message);
        navigate("/admin/sign-in");
        console.log("Admin Logged Out");
      }
    }
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    console.error("Logout Error:", err);
    const errMsg = err.response?.data.message || "Something went wrong";
    errorToast(errMsg);
    throw err;
  }
};

type ForgotPasswordType = {
  isAdmin: boolean;
  data: z.infer<typeof forgotPasswordSchema>;
};

const forgotPasswordHelper = async ({ isAdmin, data }: ForgotPasswordType) => {
  try {
    const res = isAdmin
      ? await forgotPasswordAdmin(data)
      : await forgotPasswordUser(data);
    if (res.status === 200) {
      successToast(res.data.message);
    }
  } catch (error: any) {
    const err = error as AxiosError<ApiErrorType>;
    const errMsg = err.response?.data.message || "Something went wrong";
    errorToast(errMsg);
    throw err;
  }
};

type ResetPasswordType = {
  isAdmin: boolean;
  data: z.infer<typeof resetPasswordSchema>;
  navigate: (path: string) => void;
  params: any;
  timeoutRef: RefObject<NodeJS.Timeout | null>;
};
const resetPasswordHelper = async ({
  data,
  isAdmin,
  navigate,
  params,
  timeoutRef,
}: ResetPasswordType) => {
  try {
    const res = isAdmin
      ? await resetPasswordAdmin(data, params)
      : await resetPasswordUser(data, params);
    if (res.status === 200) {
      successToast(res.data.message);
      timeoutRef.current = setTimeout(() => {
        navigate(isAdmin ? "/admin/sign-in" : "/sign-in");
      }, 1000);
    }
  } catch (error: any) {
    const err = error as AxiosError<ApiErrorType>;
    const errMsg = err.response?.data.message || "Something went wrong";
    errorToast(errMsg);
    throw err;
  }
};

type UpdateProfileType = {
  isAdmin: boolean;
  data: z.infer<typeof updateProfileSchema>;
  role: RoleType;
};

const updateProfileHelper = async ({
  isAdmin,
  data,
  role,
}: UpdateProfileType) => {
  try {
    const res = isAdmin
      ? await updateAdminProfile(data)
      : await updateUserProfile(data);
    if (res.status === 200) {
      successToast("Profile Updated Successfully!");
      return true;
    }
    errorToast("Failed to update profile.");
    return false;
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    const errMsg = err.response?.data.message || "Something went wrong";
    errorToast(errMsg);
    return false;
  }
};

type UpdatePasswordType = {
  isAdmin: boolean;
  data: z.infer<typeof updatePasswordSchema>;
};

const updatePasswordHelper = async ({ isAdmin, data }: UpdatePasswordType) => {
  try {
    const res = isAdmin
      ? await updateAdminPassword(data)
      : await updateUserPassword(data);

    if (res.status === 200) {
      successToast("Password Updated Successfully!");
      return true;
    }
    errorToast("Failed to update password.");
    return false;
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    const errMsg = err.response?.data.message || "Something went wrong";
    errorToast(errMsg);
    return false;
  }
};

const getUserByRole = async (role: RoleType) => {
  try {
    if (role === "user") {
      const res = await getUser();
      if (res.status === 200) {
        return res.data.data;
      }
    } else if (role === "admin") {
      const res = await getAdmin();
      if (res.status === 200) {
        return res.data.data;
      }
    }
  } catch (error) {
    const err = error as AxiosError<ApiErrorType>;
    throw err;
  }
};

export {
  logoutHelper,
  loginHelper,
  forgotPasswordHelper,
  resetPasswordHelper,
  updateProfileHelper,
  updatePasswordHelper,
  getUserByRole,
};
