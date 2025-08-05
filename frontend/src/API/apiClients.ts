import axios from "axios";

export const baseApi = axios.create({
  baseURL: "http://localhost:3006/",
});

export const userApi = axios.create({
  baseURL: "http://localhost:3006/user",
});

export const userProductApi = axios.create({
  baseURL: "http://localhost:3006/product",
});

export const orderApi = axios.create({
  baseURL: "http://localhost:3006/order",
});

export const adminApi = axios.create({
  baseURL: "http://localhost:3006/admin",
});

export const adminProductApi = axios.create({
  baseURL: "http://localhost:3006/product/admin",
});

export const adminOrderApi = axios.create({
  baseURL: "http://localhost:3006/order/admin",
  withCredentials: true
})

export const activityApi = axios.create({
  baseURL: "http://localhost:3006/activity",
});
