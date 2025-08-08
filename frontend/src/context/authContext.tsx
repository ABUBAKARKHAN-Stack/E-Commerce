import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import {
  IAdmin,
  IUser,
  UserUpdatedJwtPayload,
  AdminUpdatedJwtPayload,
  ApiErrorType,
  RoleType,
  QueryKeys,
} from "@/types/main.types";
import {
  loginUser,
  logoutUser,
  forgotPasswordUser,
  resetPasswordUser,
  updateUserProfile,
  updateUserPassword,
} from "@/API/userApi";
import {
  loginAdmin,
  logoutAdmin,
  forgotPasswordAdmin,
  resetPasswordAdmin,
  updateAdminProfile,
  updateAdminPassword,
} from "@/API/adminApi";
import { z } from "zod";
import {
  errorToast,
  infoToast,
  successToast,
} from "@/utils/toastNotifications";
import {
  forgotPasswordSchema,
  signinSchema,
  resetPasswordSchema,
} from "@/schemas/authSchema";
import {
  updatePasswordSchema,
  updateProfileSchema,
} from "@/schemas/update-ProfileSchema";
import { AxiosError } from "axios";
import { useUserByRole } from "@/hooks/useUserByRole";
import { queryClient } from "@/utils/tanstackQueryClient";

type AuthContextType = {
  user: IUser | IAdmin | null;
  role: RoleType;
  login: (
    data: z.infer<typeof signinSchema>,
    isAdmin: boolean,
    navigate: (path: string) => void,
    isUsingInAuthDialog?: boolean,
  ) => Promise<void>;
  logout: (navigate: (path: string) => void) => Promise<void>;
  forgotPassword: (
    isAdmin: boolean,
    data: z.infer<typeof forgotPasswordSchema>,
  ) => Promise<void>;
  resetPassword: (
    isAdmin: boolean,
    data: z.infer<typeof resetPasswordSchema>,
    navigate: (path: string) => void,
    params: any,
  ) => Promise<void>;
  updateProfile: (
    isAdmin: boolean,
    data: z.infer<typeof updateProfileSchema>,
    role: RoleType,
  ) => Promise<boolean>;
  updatePassword: (
    isAdmin: boolean,
    data: z.infer<typeof updatePasswordSchema>,
  ) => Promise<boolean>;
  setRole: (role: RoleType) => void;
  loading: boolean;
  userLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | IAdmin | null>(null);
  const [role, setRole] = useState<RoleType>(null);
  const [loading, setLoading] = useState(false);
  const {
    data: currentUser,
    isLoading: userLoading,
    isError: userError
  } = useUserByRole(role);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (currentUser) {
      console.log('calling it again');

      setUser(currentUser)
    }
  }, [currentUser])

  useEffect(() => {
    if (userError) {
      setUser(null);
      setRole(null);
      localStorage.removeItem("userToken");
      localStorage.removeItem("adminToken");
    }
  }, [userError]);


  const login = async (
    data: z.infer<typeof signinSchema>,
    isAdmin: boolean,
    navigate: (path: string) => void,
    isUsingInAuthDialog = false,
  ) => {
    try {
      setLoading(true);
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
      console.log(error);
      const errorMsg = error.response.data.message;
      errorToast(errorMsg);
    } finally {
      setLoading(false);
    }
  };


  const logout = async (navigate: (path: string) => void) => {
    try {
      if (role === "user") {
        const res = await logoutUser();
        if (res.data.success) {
          localStorage.removeItem("userToken");
          setUser(null);
          setRole(null);
          navigate("/sign-in");
          console.log("User Logged Out");
        }
      } else if (role === "admin") {
        const res = await logoutAdmin();
        if (res.data.success) {
          localStorage.removeItem("adminToken");
          setUser(null);
          setRole(null);
          navigate("/admin/sign-in");
          console.log("Admin Logged Out");
        }
      }
    } catch (error) {
      errorToast("Logout failed. Please try again.");
      console.error("Logout Error:", error);
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");

    if (userToken) {
      try {
        const userDecodedToken: UserUpdatedJwtPayload = jwtDecode(userToken);
        if (userDecodedToken.role === "user") {
          setRole("user");
        }
      } catch (error) {
        console.error("Invalid User Token:", error);
        localStorage.removeItem("userToken");
      }
    } else if (adminToken) {
      try {
        const adminDecodedToken: AdminUpdatedJwtPayload = jwtDecode(adminToken);
        if (adminDecodedToken.role === "admin") {
          setRole("admin");
        }
      } catch (error) {
        console.error("Invalid Admin Token:", error);
        localStorage.removeItem("adminToken");
      }
    }
  }, []);



  const forgotPassword = async (
    isAdmin: boolean,
    data: z.infer<typeof forgotPasswordSchema>,
  ) => {
    try {
      setLoading(true);
      const res = isAdmin
        ? await forgotPasswordAdmin(data)
        : await forgotPasswordUser(data);
      if (res.status === 200) {
        successToast(res.data.message);
      }
    } catch (error: any) {
      const errMsg = error.response.data.message || "Something went wrong";
      errorToast(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    isAdmin: boolean,
    data: z.infer<typeof resetPasswordSchema>,
    navigate: (path: string) => void,
    params: any,
  ) => {
    try {
      setLoading(true);
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
      const errMsg = error.response.data.message || "Something went wrong";
      errorToast(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (
    isAdmin: boolean,
    data: z.infer<typeof updateProfileSchema>,
    role: RoleType,
  ) => {
    try {

      const res = isAdmin
        ? await updateAdminProfile(data)
        : await updateUserProfile(data);
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.FETCH_USER, role],
          exact: false
        })
        successToast("Profile Updated Successfully!");
        return true;
      }
      errorToast("Failed to update profile.");
      return false;
    } catch (error) {
      const err = error as AxiosError<ApiErrorType>;
      console.log(err);

      const errMsg = err.response?.data.message || "Something went wrong";
      errorToast(errMsg);
      return false;
    }
  };

  const updatePassword = async (
    isAdmin: boolean,
    data: z.infer<typeof updatePasswordSchema>,
  ) => {
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

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);



  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        login,
        logout,
        forgotPassword,
        userLoading,
        resetPassword,
        setRole,
        loading,
        updateProfile,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within a AuthProvider");
  return context;
};
export { AuthProvider, useAuthContext };
