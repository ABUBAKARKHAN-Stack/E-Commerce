import React, { useState } from 'react'
import { AdminProducts, SideBar, Layout, Logo, AdminHeader } from '../reusable'
import { Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { useAuthContext } from '@/context/authContext'

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