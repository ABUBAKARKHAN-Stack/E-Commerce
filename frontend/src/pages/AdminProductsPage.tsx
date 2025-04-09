import React from 'react'
import { Layout, ThemeToggler } from '@/components/reusable'
import { AdminProductsMian } from '@/components/main'

const AdminProductsPage = () => {
    return (
        <>

            <ThemeToggler />
            <AdminProductsMian />
        </>
    )
}

export default AdminProductsPage