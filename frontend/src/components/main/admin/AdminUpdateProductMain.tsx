import { useState } from 'react'
import { Layout, SideBar } from '@/components/layout/shared'
import { AdminHeader } from '@/components/layout/admin'
import { AdminUpdateProduct } from '@/components/sections/admin'


const AdminUpdateProductMain = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <AdminHeader setIsOpen={setIsOpen} />
            <div className="flex my-5">
                <SideBar isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} />
                <Layout>
                    <AdminUpdateProduct />
                </Layout>
            </div>
        </>
    )
}

export default AdminUpdateProductMain