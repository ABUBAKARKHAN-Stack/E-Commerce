import { adminApi, adminOrderApi, adminProductApi, orderApi } from "./apiClients";
import { adminInterceptor } from "./axiosInterceptor";

//* Admin APIS

//* +++++++++++++++++++++++++++++++ Admin Auth Api +++++++++++++++++++++++++++++++

//* Create New Admin
const createAdmin = async (data: any) => {
  return await adminApi.post("/create", data);
};

//* Login Admin
const loginAdmin = async (data: any) => {
  return await adminApi.post("/login", data, {
    withCredentials: true,
  });
};

//* Get ADMIN PROFILE
const getAdmin = async () => {
  return await adminInterceptor.get("/get-profile");
};

//* Logout ADMIN
const logoutAdmin = async () => {
  return await adminApi.get("/logout", {
    withCredentials: true,
  });
};

//* ForgotPassword Admin
const forgotPasswordAdmin = async (data: any) => {
  return await adminApi.post("/forgot-password", data);
};

//* Reset Password Admin
const resetPasswordAdmin = async (data: any, params: any) => {
  return adminApi.post("/reset-password", data, {
    params: {
      email: params.email,
      token: params.token,
    },
  });
};

const updateAdminProfile = async (data: any) => {
  return adminApi.patch("/update/profile", data, {
    withCredentials: true,
  });
};

const updateAdminPassword = async (data: any) => {
  return await adminApi.patch("/update/password", data, {
    withCredentials: true,
  });
};

//* +++++++++++++++++++ Admin Product Apis ++++++++++++++++++++++++

//* Create Product
const createProduct = async (data: any) => {
  return await adminProductApi.post("/create", data, {
    withCredentials: true,
  });
};

const deleteProduct = async (productId: string) => {
  return await adminProductApi.delete(`/delete/${productId}`, {
    withCredentials: true,
  });
};

const updateProduct = async (productId: string, data: any) => {
  return await adminProductApi.patch(`/update/${productId}`, data, {
    withCredentials: true,
  });
};

const removeProductThumbnail = async (
  productId: string,
  thumbnailIndex: any,
) => {
  return await adminProductApi.delete(
    `/remove-thumbnail/${productId}/thumbnail?thumbnailIndex=${thumbnailIndex}`,
    {
      withCredentials: true,
    },
  );
};

//* +++++++++++++++++++ Admin Order Apis ++++++++++++++++++++++++
const getAllOrders = async (queryParams: any) => {
  return await adminOrderApi.get('/orders', {
    params: queryParams
  })
}

const getSingleOrder = async (orderId: string) => {
  return await adminOrderApi.get(`/orders/${orderId}`)
}

const markOrderAsProcessing = async (orderId: string) => {
  return await adminOrderApi.get(`/mark-as/processing/${orderId}`)
}

const markOrderAsShipped = async (orderId: string) => {
  return await adminOrderApi.get(`/mark-as/shipped/${orderId}`)
}
const markOrderAsDelivered = async (orderId: string) => {
  return await adminOrderApi.get(`/mark-as/delivered/${orderId}`)
}


export {
  createAdmin,
  loginAdmin,
  getAdmin,
  logoutAdmin,
  forgotPasswordAdmin,
  resetPasswordAdmin,
  updateAdminProfile,
  updateAdminPassword,
  createProduct,
  deleteProduct,
  updateProduct,
  removeProductThumbnail,
  getAllOrders,
  getSingleOrder,
  markOrderAsProcessing,
  markOrderAsShipped,
  markOrderAsDelivered
};
