import { z } from 'zod'
import { activityApi, orderApi, userApi, userProductApi } from './apiClients'
import { addReviewSchema } from '@/schemas/add-reviewSchema'
import { contactSchema } from '@/schemas/contactSchema'
import { CompleteCheckoutBody, OrderedProduct } from '@/types/main.types'

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
const getProducts = async (params?: any) => {
  console.log(params, 'from func');

  return await userProductApi.get('/all', {
    params: params,
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

const addToWishList = async (productId: string) => {
  return await userProductApi.post('/add-to-wishlist', { productId }, {
    withCredentials: true
  })
}

const removeFromWishList = async (productId: string) => {
  return await userProductApi.delete(`/remove-from-wishlist/${productId}`, {
    withCredentials: true
  })
}

const getWishList = async () => {
  return await userApi.get('/wishlist', {
    withCredentials: true
  })
}

const sendContactMessage = async (data: z.infer<typeof contactSchema>) => {
  return await userApi.post('/contact', data)
}


const addToCart = async (productId: string, quantity: number) => {
  return await userProductApi.post(`add-to-cart/${productId}`, { quantity }, {
    withCredentials: true
  })
}

const updateCart = async (productId: string, quantity: number) => {
  return await userProductApi.put(`update-cart/${productId}`, { quantity }, {
    withCredentials: true
  })
}

const removeFromCart = async (productId: string) => {
  return await userProductApi.delete(`remove-from-cart/${productId}`, {
    withCredentials: true
  })
}

const getCartDetails = async () => {
  return await userApi.get('cart/details', {
    withCredentials: true
  })
}

const getBulkProducts = async (productIds: string[]) => {
  return await userProductApi.post('/bulk', {
    bulk_ids: productIds
  }, { withCredentials: true })
}


const getReviews = async (productId: string) => {
  return await userProductApi.get(`/${productId}/reviews`)
}

const createReview = async (productId: string, data: z.infer<typeof addReviewSchema>) => {
  return await userProductApi.post(`/${productId}/reviews`, data, {
    withCredentials: true
  })
}

const updateReview = async (productId: string, data: z.infer<typeof addReviewSchema>) => {
  return await userProductApi.put(`/${productId}/reviews`, {
    updatedReview: data.review,
    updatedRating: data.rating
  }, {
    withCredentials: true
  })
}

const deleteReview = async (productId: string) => {
  return await userProductApi.delete(`/${productId}/reviews`, {
    withCredentials: true
  })
}

const proceedToCheckout = async () => {
  return await userApi.get('/cart/checkout', {
    withCredentials: true
  })
}

const getPendingOrderDetails = async () => {
  return await orderApi.get('/pending', {
    withCredentials: true
  })
}

const getConfirmedOrderDetails = async (orderId: string) => {
  return await orderApi.get('/confirmed', {
    params: { orderId },
    withCredentials: true
  })
}

const getAllOrders = async (params?: any) => {
  return await orderApi.get('/all-orders', {
    params,
    withCredentials: true
  })
}

const getSingleOrder = async (orderId: string) => {
  return await orderApi.get(`/${orderId}`, {
    withCredentials: true
  })
}
const completeCheckout = async (checkoutBody: CompleteCheckoutBody) => {
  return await orderApi.post('/complete-checkout', checkoutBody, {
    withCredentials: true
  })
}

const cancelOrder = async (orderId: string) => {
  return await orderApi.post('/cancel', { orderId }, {
    withCredentials: true
  })
}

const downloadOrderInvoice = async (orderId: string, products: OrderedProduct[]) => {
  return await orderApi.post('invoice/download', { products }, {
    params: { orderId },
    responseType: "blob",
    withCredentials: true
  })
}

const getRecentActivity = async (params: any) => {
  return activityApi.get('/recent', {
    params,
    withCredentials: true
  })
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
  getTopRatedProducts,
  addToWishList,
  removeFromWishList,
  getWishList,
  sendContactMessage,
  addToCart,
  updateCart,
  removeFromCart,
  getCartDetails,
  getBulkProducts,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  proceedToCheckout,
  getPendingOrderDetails,
  getConfirmedOrderDetails,
  getAllOrders,
  cancelOrder,
  downloadOrderInvoice,
  getSingleOrder,
  completeCheckout,
  getRecentActivity
}