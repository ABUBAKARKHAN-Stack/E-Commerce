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
  RoleType,
  AuthLoadingStates,
} from "@/types/main.types";

import { z } from "zod";
import {
  forgotPasswordSchema,
  signinSchema,
  resetPasswordSchema,
} from "@/schemas/authSchema";
import {
  updatePasswordSchema,
  updateProfileSchema,
} from "@/schemas/update-ProfileSchema";
import { useAuthQuery } from "@/hooks/useAuthQuery";

type AuthContextType = {
  user: IUser | IAdmin | null;
  role: RoleType;
  login: (
    data: z.infer<typeof signinSchema>,
    isAdmin: boolean,
    navigate: (path: string) => void,
    isUsingInAuthDialog?: boolean
  ) => void;
  logout: (navigate: (path: string) => void) => void;
  forgotPassword: (
    isAdmin: boolean,
    data: z.infer<typeof forgotPasswordSchema>,
  ) => void;
  resetPassword: (
    isAdmin: boolean,
    data: z.infer<typeof resetPasswordSchema>,
    navigate: (path: string) => void,
    params: any,
  ) => void;
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
  loading: AuthLoadingStates;
  userLoading: boolean;
};



const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | IAdmin | null>(null);
  const [role, setRole] = useState<RoleType>(null);
  const [loading, setLoading] = useState<AuthLoadingStates>(AuthLoadingStates.idle);
  const {
    useLogin,
    useLogout,
    useForgotPassword,
    useResetPassword,
    useUpdateProfile,
    useUpdatePassword,
    useFetchUserByRole,
  } = useAuthQuery();

  const loginMutation = useLogin(role, setLoading) //* Login Mutation
  const logoutMutation = useLogout(setLoading) //* Logout Mutation
  const forgotPasswordMutation = useForgotPassword(setLoading) //* Forgot Password Mutation
  const resetPasswordMutation = useResetPassword(setLoading) //* Reset Password Mutation
  const updateProfileMutation = useUpdateProfile(setLoading) //* Update Profile Mutation
  const updatePasswordMutation = useUpdatePassword(setLoading) //* Update Password Mutation


  const {
    data: currentUser,
    isLoading: userLoading,
    isError: userError
  } = useFetchUserByRole(role); //* Fetch User on role based

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (currentUser) {
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


  const login = (
    data: z.infer<typeof signinSchema>,
    isAdmin: boolean,
    navigate: (path: string) => void,
    isUsingInAuthDialog = false
  ) => {
    const mutation = loginMutation;
    mutation.mutate({
      data,
      isAdmin,
      navigate,
      isUsingInAuthDialog,
      setRole,
    });
  };

  const logout = (navigate: (path: string) => void) => {
    logoutMutation.mutate({
      navigate,
      role,
      setRole,
      setUser
    })
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



  const forgotPassword = (
    isAdmin: boolean,
    data: z.infer<typeof forgotPasswordSchema>,
  ) => {
    forgotPasswordMutation.mutate({
      isAdmin,
      data
    })
  };

  const resetPassword = (
    isAdmin: boolean,
    data: z.infer<typeof resetPasswordSchema>,
    navigate: (path: string) => void,
    params: any,
  ) => {
    resetPasswordMutation.mutate({
      isAdmin,
      data,
      navigate,
      params,
      timeoutRef
    })
  };

  const updateProfile = async (
    isAdmin: boolean,
    data: z.infer<typeof updateProfileSchema>,
    role: RoleType,
  ) => {
    const success = await updateProfileMutation.mutateAsync({
      data,
      isAdmin,
      role
    })
    return success ?? false
  };

  const updatePassword = async (
    isAdmin: boolean,
    data: z.infer<typeof updatePasswordSchema>,
  ) => {
    const success = await updatePasswordMutation.mutateAsync({
      isAdmin,
      data
    })
    return success ?? false;
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
