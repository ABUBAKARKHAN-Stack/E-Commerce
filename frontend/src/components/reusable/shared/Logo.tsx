import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import shopnexLogo from '@/assets/shopnex.webp'

type Props = {
    width?: string;
    className?: string
}

const Logo: FC<Props> = ({ width = "w-48" , className }) => {
    return (
        <Link to="/" className="text-white">
            <img
                src={shopnexLogo}
                alt="ShopNex Logo"
                className={`${width} ${className} dark:invert-0 invert`}
            />
        </Link>
    )
}

export default Logo