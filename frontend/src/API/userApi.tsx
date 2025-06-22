import { userApi, userProductApi } from './apiClients'

//* User APIS

//* ++++++++++++++++++ User Auth Api ++++++++++++++++++++
//* Create New USER
const createUser = async (data: any) => {
  return await userApi.post("/create", data)
}

//* Login USER
const loginUser = async (data: any) => {
  return await userApi.post("/login", data, {
    withCredentials: true
  })
}

//* Verify USER
const verifyUser = async (email: string, token: string) => {
  return await userApi.get(`/verify/${email}/${token}`)
}

//* Get USER
const getUser = async () => {
  return await userApi.get('/get-profile', {
    withCredentials: true
  })
}

//* Logout USER
const logoutUser = async () => {
  return await userApi.get('/logout', {
    withCredentials: true
  })
}

//* Forgot Password
const forgotPasswordUser = async (data: any) => {
  return await userApi.post('/forgot-password', data)
}

//* Reset Password
const resetPasswordUser = async (data: any, params: any) => {
  return await userApi.post('/reset-password', data, {
    params: {
      email: params.email,
      token: params.token
    }
  })
}

//* +++++++++++++++++++ User Product Api ++++++++++++++
const getProducts = async () => {
  return await userProductApi.get('/all', {
    withCredentials: true
  })
}

const getSingleProduct = async (productId: string) => {
  return await userProductApi.get(`/${productId}`, {
    withCredentials: true
  })
}

const getCategories = async () => {
  return await userProductApi.get('/categories', {
    withCredentials: true
  })
}

const getTopCategories = async () => {
  return await userProductApi.get('/top-categories');
}

const getTopRatedProducts = async () => {
  return await userProductApi.get('/top-rated');
}

export {
  createUser,
  loginUser,
  verifyUser,
  getUser,
  logoutUser,
  forgotPasswordUser,
  resetPasswordUser,
  getProducts,
  getSingleProduct,
  getCategories,
  getTopCategories,
  getTopRatedProducts
}