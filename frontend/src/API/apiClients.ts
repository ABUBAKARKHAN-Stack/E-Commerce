import axios from "axios";


export const userApi = axios.create({
    baseURL: 'http://localhost:3005/user'
})

export const userProductApi = axios.create({
    baseURL: 'http://localhost:3005/product'
})


export const adminApi = axios.create({
    baseURL: 'http://localhost:3005/admin'
})

export const adminProductApi = axios.create({
    baseURL: 'http://localhost:3005/product/admin'
})