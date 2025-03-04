import { useState } from 'react'
import { AdminHeader, Layout, SideBar } from '../reusable'
import { AdminAddProduct } from '@/components/reusable'


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