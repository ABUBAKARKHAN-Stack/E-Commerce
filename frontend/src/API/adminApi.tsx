import axios from "axios"

//* Admin APIS
const api = axios.create({
    baseURL: `http://localhost:3005`,
})

//* +++++++++++++++++++++++++++++++ Auth Api +++++++++++++++++++++++++++++++

//* Create New Admin
const createAdmin = async (data: any) => {
    return await api.post("/admin/create", data)
}

//* Login Admin
const loginAdmin = async (data: any) => {
    return await api.post("/admin/login", data, {
        withCredentials: true
    })
}


//* Get ADMIN PROFILE
const getAdmin = async () => {
    return await api.get('/admin/get-profile', {
        withCredentials: true
    })
}

//* Logout ADMIN 
const logoutAdmin = async () => {
    return await api.get('/admin/logout', {
        withCredentials: true
    })
}

//* Create Product
const createProduct = async (data: any) => {
    return await api.post('/product/admin/create', data, {
        withCredentials: true
    })
}

const getProducts = async () => {
    return await api.get('/product/all', {
        withCredentials: true
    })
}

const getSingleProduct = async (productId: string) => {
    return await api.get(`/product/${productId}`, {
        withCredentials: true
    })
}

const deleteProduct = async (productId: string) => {
    return await api.delete(`/product/admin/delete/${productId}`, {
        withCredentials: true
    })
}

const updateProduct = async (productId: string, data: any) => {
    return await api.put(`/product/admin/update/${productId}`, data, {
        withCredentials: true
    })
}

const removeProductThumbnail = async (productId: string, thumbnailIndex: any) => {
    return await api.delete(`/product/admin/remove-thumbnail/${productId}/thumbnail?thumbnailIndex=${thumbnailIndex}`, {
        withCredentials: true
    })

}

export {
    createAdmin,
    loginAdmin,
    getAdmin,
    logoutAdmin,
    createProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    removeProductThumbnail
}
