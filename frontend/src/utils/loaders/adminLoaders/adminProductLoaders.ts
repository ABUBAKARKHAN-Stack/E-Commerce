import { getSingleProduct } from "@/API/userApi";
import { ApiErrorType, IProduct } from "@/types/main.types";
import { ApiError } from "@/utils/ApiError";
import { AxiosError } from "axios";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

const singleProductDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    if (!id) return;
    try {
        const res = await getSingleProduct(id);
        if (res.status === 200) {
            const product: IProduct = res.data.data;
            return product
        }
        throw new ApiError(
            res.status,
            "Unexpected response from Admin Product Details API",
        );

    } catch (error) {
        const err = error as AxiosError<ApiErrorType>;
        const errStatus = err.response?.status || 500;
        const errMsg = err.response?.data.message || "Something went wrong";
        if (errStatus === 401 || errStatus === 403) {
            return redirect("/admin/sign-in");
        }
        throw new ApiError(errStatus, errMsg, err.response?.data);
    }
}

export {
    singleProductDetailsLoader
}