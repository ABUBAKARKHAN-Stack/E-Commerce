import axios from 'axios'
import { get } from 'http'

//* User APIS

const api = axios.create({
  baseURL: `http://localhost:3005/user`,
  // withCredentials: true
})

//* Create New USER
const createUser = async (data: any) => {
  return await api.post("/create", data)
}

//* Login USER
const loginUser = async (data: any) => {
  return await api.post("/login", data, {
    withCredentials: true
  })
}

//* Verify USER
const verifyUser = async (email: string, token: string) => {
  return await api.get(`/verify/${email}/${token}`)
}

//* Get USER
const getUser = async () => {
  return await api.get('/get-profile', {
    withCredentials: true
  })
}

//* Logout USER
const logoutUser = async () => {
  return await api.get('/logout', {
    withCredentials: true
  })
}

export {
  createUser,
  loginUser,
  verifyUser,
  getUser,
  logoutUser
}