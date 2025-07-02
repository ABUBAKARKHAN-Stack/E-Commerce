import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { jwtDecode } from 'jwt-decode'
import { IAdmin, IUser, UserUpdatedJwtPayload, AdminUpdatedJwtPayload } from "@/types/main.types";
import { getUser, loginUser, logoutUser, forgotPasswordUser, resetPasswordUser } from "@/API/userApi";
import { getAdmin, loginAdmin, logoutAdmin, forgotPasswordAdmin, resetPasswordAdmin } from "@/API/adminApi";
import { z } from "zod";
import { errorToast, infoToast, successToast } from "@/utils/toastNotifications";
import { forgotPasswordSchema, signinSchema, resetPasswordSchema } from "@/schemas/authSchema";

type RoleType = "user" | "admin" | null;


type AuthContextType = {
    user: IUser | IAdmin | null;
    role: RoleType;
    login: (data: z.infer<typeof signinSchema>, isAdmin: boolean, navigate: (path: string) => void, isUsingInAuthDialog?: boolean) => Promise<void>;
    fetchData: (role: RoleType) => Promise<void>;
    logout: (navigate: (path: string) => void) => Promise<void>;
    forgotPassword: (isAdmin: boolean, data: z.infer<typeof forgotPasswordSchema>) => Promise<void>;
    resetPassword: (isAdmin: boolean, data: z.infer<typeof resetPasswordSchema>, navigate: (path: string) => void, params: any) => Promise<void>;
    setRole: (role: RoleType) => void;
    loading: boolean;
}


const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | IAdmin | null>(null)
    const [role, setRole] = useState<RoleType>(null);
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const login = async (
        data: z.infer<typeof signinSchema>,
        isAdmin: boolean,
        navigate: (path: string) => void,
        isUsingInAuthDialog = false
    ) => {
        try {
            setLoading(true)
            const res = isAdmin ? await loginAdmin(data) : await loginUser(data)
            if (isAdmin && res.data.data.adminToken) {
                localStorage.setItem("adminToken", res.data.data.adminToken)
                setRole("admin")
                navigate("/admin/dashboard")
            } else if (res.data.data.userToken) {
                localStorage.setItem("userToken", res.data.data.userToken)
                setRole("user")
                if (isUsingInAuthDialog) {
                    successToast("User Logged in Successfully");
                    return;
                };
                navigate("/")
            } else {
                infoToast("Something went wrong")
            }
        } catch (error: any) {
            console.log(error);
            const errorMsg = error.response.data.message
            errorToast(errorMsg)
        } finally {
            setLoading(false)
        }

    }

    const fetchData = useCallback(async (role: RoleType) => {
        try {
            setLoading(true);
            if (role === "user") {
                const res = await getUser();
                setUser(res.data.data);
            } else if (role === "admin") {
                const res = await getAdmin();
                setUser(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    }, []);





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


    useEffect(() => {
        if (role) {
            fetchData(role);
        }
    }, [role]);




    const forgotPassword = async (isAdmin: boolean, data: z.infer<typeof forgotPasswordSchema>) => {
        try {
            setLoading(true)
            const res = isAdmin ? await forgotPasswordAdmin(data) : await forgotPasswordUser(data);
            if (res.status === 200) {
                successToast(res.data.message)
            }
        } catch (error: any) {
            const errMsg = error.response.data.message || "Something went wrong";
            errorToast(errMsg)
        } finally {
            setLoading(false)
        }
    }

    const resetPassword = async (isAdmin: boolean, data: z.infer<typeof resetPasswordSchema>, navigate: (path: string) => void, params: any) => {
        try {
            setLoading(true)
            const res = isAdmin ? await resetPasswordAdmin(data, params) : await resetPasswordUser(data, params);
            if (res.status === 200) {
                successToast(res.data.message);
                timeoutRef.current = setTimeout(() => {
                    navigate(isAdmin ? '/admin/sign-in' : '/sign-in');
                }, 1000);
            }
        } catch (error: any) {
            const errMsg = error.response.data.message || "Something went wrong";
            errorToast(errMsg)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    }, [])


    return (
        <AuthContext.Provider value={{ user, role, login, fetchData, logout, forgotPassword, resetPassword, setRole, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within a AuthProvider");

    return context;
}
export {
    AuthProvider,
    useAuthContext
}