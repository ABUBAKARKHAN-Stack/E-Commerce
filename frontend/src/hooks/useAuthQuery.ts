import { forgotPasswordHelper, getUserByRole, loginHelper, logoutHelper, resetPasswordHelper, updatePasswordHelper, updateProfileHelper } from "@/helpers/authApiHelpers";
import { AuthLoadingStates, QueryKeys, RoleType } from "@/types/main.types";
import { queryClient } from "@/utils/tanstackQueryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
const useAuthQuery = () => {

    const useLogin = (role: RoleType, setLoading: Dispatch<SetStateAction<AuthLoadingStates>>) => {
        return useMutation({
            mutationFn: loginHelper,
            onMutate: () => setLoading(AuthLoadingStates.LOGIN_LOADING),
            onSuccess: () => queryClient.invalidateQueries({
                queryKey: [QueryKeys.FETCH_USER, role]
            }),
            onSettled: () => setLoading(AuthLoadingStates.idle)
        })
    }

    const useLogout = (setLoading: Dispatch<SetStateAction<AuthLoadingStates>>) => {
        return useMutation({
            mutationFn: logoutHelper,
            onMutate: () => setLoading(AuthLoadingStates.LOGOUT_LOADING),
            onSettled: () => setLoading(AuthLoadingStates.idle),
        })
    }

    const useForgotPassword = (setLoading: Dispatch<SetStateAction<AuthLoadingStates>>) => {
        return useMutation({
            mutationFn: forgotPasswordHelper,
            onMutate: () => setLoading(AuthLoadingStates.FORGOT_PASSWORD_LOADING),
            onSettled: () => setLoading(AuthLoadingStates.idle)
        })
    }

    const useResetPassword = (setLoading: Dispatch<SetStateAction<AuthLoadingStates>>) => {
        return useMutation({
            mutationFn: resetPasswordHelper,
            onMutate: () => setLoading(AuthLoadingStates.RESET_PASSWORD_LOADING),
            onSettled: () => setLoading(AuthLoadingStates.idle)
        })
    }

    const useUpdateProfile = (setLoading: Dispatch<SetStateAction<AuthLoadingStates>>) => {
        return useMutation({
            mutationFn: updateProfileHelper,
            onMutate: () => setLoading(AuthLoadingStates.UPDATE_PROFILE_LOADING),
            onSuccess: (_, { role }) => {
                queryClient.invalidateQueries({
                    queryKey: [QueryKeys.FETCH_USER, role],
                    exact: false
                })
            },
            onSettled: () => setLoading(AuthLoadingStates.idle)
        })
    }

    const useUpdatePassword = (setLoading: Dispatch<SetStateAction<AuthLoadingStates>>) => {
        return useMutation({
            mutationFn: updatePasswordHelper,
            onMutate: () => setLoading(AuthLoadingStates.UPDATE_PASSWORD_LOADING),
            onSettled: () => setLoading(AuthLoadingStates.idle)
        })
    }

    const useFetchUserByRole = (role: RoleType) => {
        return useQuery({
            queryKey: [QueryKeys.FETCH_USER, role],
            queryFn: () => getUserByRole(role),
            enabled: !!role,
            staleTime: Infinity, //* Cache Data For Infinite time
            gcTime: 30 * 60 * 1000, //* After 30 Mins send to Garbage Collection
        })
    }


    return {
        useLogin,
        useLogout,
        useForgotPassword,
        useResetPassword,
        useUpdateProfile,
        useUpdatePassword,
        useFetchUserByRole,
    }
}
export {
    useAuthQuery
}