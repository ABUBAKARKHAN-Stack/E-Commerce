import React, { FC } from 'react'

type Props = {
    children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <main className='w-full block p-4 h-full max-w-6xl mx-auto'>
            {children}
        </main>
    )
}

export default Layout