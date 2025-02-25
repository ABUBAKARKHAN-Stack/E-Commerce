import { getUser } from "@/API/userApi";
import React, { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext({
    user: {},
    fetchUser: () => { }
})



const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null)

    const fetchUser = async () => {
        try {
            const res = await getUser()
            setUser(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <userContext.Provider value={{ user: user!, fetchUser }}>
            {children}
        </userContext.Provider>
    )
}

const useUserContext = () => {
    const context = useContext(userContext)
    return context;
}

export {
    UserProvider,
    useUserContext
}