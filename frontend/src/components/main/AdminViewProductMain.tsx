import React, { useState } from 'react'
import { AdminHeader, AdminViewProduct, Layout, SideBar } from '../reusable';

const AdminViewProductMain = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <AdminHeader setIsOpen={setIsOpen} />
            <div className="flex my-5">
                <SideBar isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} />
                <Layout>
                    <AdminViewProduct />
                </Layout>
            </div>
        </>
    )
}

export default AdminViewProductMain