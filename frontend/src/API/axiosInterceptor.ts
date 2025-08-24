import { errorToast } from "@/utils/toastNotifications";
import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const interceptorsHelper = () => {
  Cookies.remove("userToken");
  localStorage.removeItem("userToken");
  errorToast("Login session expired. Please sign in again to continue.");
};
const attachInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        interceptorsHelper();
      }
      return Promise.reject(err);
    },
  );
  return instance;
};

const userInterceptor = attachInterceptor(
  axios.create({
    baseURL: "http://localhost:3006/user",
    withCredentials: true,
  }),
);

const userProductInterceptor = attachInterceptor(
  axios.create({
    baseURL: "http://localhost:3006/product",
    withCredentials: true,
  }),
);

const userOrderInterceptor = attachInterceptor(
  axios.create({
    baseURL: "http://localhost:3006/order",
    withCredentials: true,
  }),
);

const userActivityInterceptor = attachInterceptor(
  axios.create({
    baseURL: "http://localhost:3006/activity",
    withCredentials: true,
  }),
);

//* Admin Interceptor Helper
const attachAdminInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      const status = err.response?.status;

      if ([401, 403].includes(status)) {
        Cookies.remove("adminToken");
        localStorage.removeItem("adminToken");
        errorToast("Login session expired. Please sign in again to continue.");
        setTimeout(() => {
          window.location.href = "/admin/sign-in";
        }, 1500);
      }

      return Promise.reject(err);
    },
  );
  return instance;
};

const adminInterceptor = attachAdminInterceptor(
  axios.create({
    baseURL: "http://localhost:3006/admin",
    withCredentials: true,
  }),
);

export {
  userInterceptor,
  userProductInterceptor,
  userOrderInterceptor,
  userActivityInterceptor,
  adminInterceptor,
};
