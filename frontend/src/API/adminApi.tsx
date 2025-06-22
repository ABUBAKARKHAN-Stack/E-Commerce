import { adminApi, adminProductApi } from "./apiClients"

//* Admin APIS

//* +++++++++++++++++++++++++++++++ Admin Auth Api +++++++++++++++++++++++++++++++

//* Create New Admin
const createAdmin = async (data: any) => {
    return await adminApi.post("/create", data)
}

//* Login Admin
const loginAdmin = async (data: any) => {
    return await adminApi.post("/login", data, {
        withCredentials: true
    })
}

//* Get ADMIN PROFILE
const getAdmin = async () => {
    return await adminApi.get('/get-profile', {
        withCredentials: true
    })
}

//* Logout ADMIN 
const logoutAdmin = async () => {
    return await adminApi.get('/logout', {
        withCredentials: true
    })
}

//* ForgotPassword Admin
const forgotPasswordAdmin = async (data: any) => {
    return await adminApi.post('/forgot-password', data);
}

//* Reset Password Admin
const resetPasswordAdmin = async (data: any, params: any) => {
    return adminApi.post('/reset-password', data,
        {
            params: {
                email: params.email,
                token: params.token
            }
        })
}

//* +++++++++++++++++++ Admin Product Apis ++++++++++++++++++++++++

//* Create Product
const createProduct = async (data: any) => {
    return await adminProductApi.post('/create', data, {
        withCredentials: true
    })
}

const deleteProduct = async (productId: string) => {
    return await adminProductApi.delete(`/delete/${productId}`, {
        withCredentials: true
    })
}

const updateProduct = async (productId: string, data: any) => {
    return await adminProductApi.patch(`/update/${productId}`, data, {
        withCredentials: true
    })
}

const removeProductThumbnail = async (productId: string, thumbnailIndex: any) => {
    return await adminProductApi.delete(`/remove-thumbnail/${productId}/thumbnail?thumbnailIndex=${thumbnailIndex}`, {
        withCredentials: true
    })
}

export {
    createAdmin,
    loginAdmin,
    getAdmin,
    logoutAdmin,
    forgotPasswordAdmin,
    resetPasswordAdmin,
    createProduct,
    deleteProduct,
    updateProduct,
    removeProductThumbnail
}
