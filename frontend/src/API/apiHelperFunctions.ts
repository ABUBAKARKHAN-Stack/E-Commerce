import { ApiErrorType, RoleType } from "@/types/main.types";
import { getUser } from "./userApi";
import { getAdmin } from "./adminApi";
import { AxiosError } from "axios";

const getUserByRole = async (role: RoleType) => {
    try {
        if (role === "user") {
            const res = await getUser();
            if (res.status === 200) {
                return res.data.data
            }
        } else if (role === "admin") {
            const res = await getAdmin();
            if (res.status === 200) {
                return res.data.data
            }
        }
    } catch (error) {
        const err = error as AxiosError<ApiErrorType>
        throw err
    }
}

export {
    getUserByRole
}