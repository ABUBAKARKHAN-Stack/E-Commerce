import axios from 'axios'

//* User APIS

const api = axios.create({
  baseURL: `http://localhost:3005/user`,
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

//* Forgot Password
const forgotPasswordUser = async (data: any) => {
  return await api.post('/forgot-password', data)
}

//* Reset Password
const resetPasswordUser = async (data: any, params: any) => {
  return await api.post('/reset-password', data, {
    params: {
      email: params.email,
      token: params.token
    }
  })
}

export {
  createUser,
  loginUser,
  verifyUser,
  getUser,
  logoutUser,
  forgotPasswordUser,
  resetPasswordUser
}