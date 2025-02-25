import React, { FC, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { getUser } from '@/API/userApi';
import { useUserContext } from '@/context/userContext';

type Props = {
    children: React.ReactNode;
    authenticationRequired: boolean;
}

const AuthLayout: FC<Props> = ({ children, authenticationRequired = false, }) => {

    const [userToken, setUserToken] = useState(Cookies.get("userToken"))
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { fetchUser } = useUserContext()

    useEffect(() => {
        if (authenticationRequired && !userToken) {
            navigate("/sign-in")
        } else if (userToken && !authenticationRequired) {
            navigate("/")
        }

        if (userToken) {
            fetchUser()
        }

        setLoading(false)
    }, [userToken, authenticationRequired])


    return loading ? "Loading..." : children
}

export default AuthLayout