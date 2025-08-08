import { getUserByRole } from "@/API/apiHelperFunctions";
import { QueryKeys, RoleType } from "@/types/main.types";
import { useQuery } from "@tanstack/react-query";

export const useUserByRole = (role: RoleType) => {
    return useQuery({
        queryKey: [QueryKeys.FETCH_USER, role],
        queryFn: () => getUserByRole(role),
        enabled: !!role
    })
}