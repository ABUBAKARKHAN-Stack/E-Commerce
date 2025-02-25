// import { useState } from "react";
// import { AxiosError, AxiosResponse } from "axios";

// type ApiCallFunc<T, P = void> = (params?: P) => Promise<AxiosResponse<T>>;

// const useRequest = <T, P = void>(cb: ApiCallFunc<T, P>) => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<AxiosError | null>(null);
//     const [data, setData] = useState<T | null>(null);

//     const fetchData = async (params?: P) => {
//         try {
//             setLoading(true);
//             setError(null); // Reset error before request

//             const res = await cb(params);
//             setData(res.data);
//         } catch (err) {
//             setError(err as AxiosError);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return {
//         loading,
//         error,
//         res: data,  // Data state to store response
//         fetchData,
//     };
// };

// export { useRequest };
