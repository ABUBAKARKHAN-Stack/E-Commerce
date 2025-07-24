import { Layout, SecondaryHeader, SideBar } from '@/components/layout/shared'
import React, { useState } from 'react'

const UserOrdersMain = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <SecondaryHeader
                setIsOpen={setIsOpen}
            />
            <div className="flex my-5">
                <SideBar isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} />
                <Layout>
                    Order Main
                </Layout>
            </div>
        </>
    )
}

export default UserOrdersMain