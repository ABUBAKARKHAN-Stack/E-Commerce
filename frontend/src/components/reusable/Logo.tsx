import React, { FC } from 'react'
import { Link } from 'react-router-dom'

type Props = {
    width?: string
}

const Logo: FC<Props> = ({ width = "w-48" }) => {
    return (
        <Link to="/" className="text-white">
            <img
                src="./shopnex.webp"
                alt="ShopNex Logo"
                className={`${width} dark:invert-0 invert`}
            />
        </Link>
    )
}

export default Logo