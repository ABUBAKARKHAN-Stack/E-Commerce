import React, { useState } from 'react'
import { SideBar, Layout } from '@/components/layout/shared'
import { AdminHeader } from '@/components/layout/admin'
import { AdminProducts } from '@/components/sections/admin'


const AdminProductsMian = () => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <AdminHeader setIsOpen={setIsOpen} />
            <div className="flex my-5">
                <SideBar isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} />
                <Layout>
                    <AdminProducts />
                </Layout>
            </div>

        </>
    )
}

export default AdminProductsMian