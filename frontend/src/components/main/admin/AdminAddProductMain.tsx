import { useState } from 'react'
import {  Layout, SideBar } from '@/components/layout/shared'
import { AdminHeader } from '@/components/layout/admin'
import { AdminAddProduct } from '@/components/sections/admin'


const AdminAddProductMain = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <AdminHeader setIsOpen={setIsOpen} />
            <div className="flex my-5">
                <SideBar isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} />
                <Layout>
                    <AdminAddProduct />
                </Layout>
            </div>
        </>
    )
}

export default AdminAddProductMain