import { useState } from 'react'
import { AdminHeader, Layout, SideBar } from '../reusable'
import { AdminUpdateProduct } from '@/components/reusable'


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