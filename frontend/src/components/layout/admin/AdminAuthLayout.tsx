import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

type Props = {
    authenticationRequired: boolean;
    children?: React.ReactNode;
};

const AdminAuthLayout: FC<Props> = ({ authenticationRequired, children }) => {
    const adminToken = Cookies.get("adminToken");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authenticationRequired && !adminToken) {
            navigate("/admin/sign-in");
        } else if (!authenticationRequired && adminToken) {
            navigate("/admin/dashboard");
        }
        setLoading(false);
    }, []); // ✅ Prevent unnecessary re-renders

    if (loading) return <p>Loading...</p>; // ✅ Prevents flashing issues

    return <>{children}</>; // ✅ Optimized return structure
};

export default AdminAuthLayout;
