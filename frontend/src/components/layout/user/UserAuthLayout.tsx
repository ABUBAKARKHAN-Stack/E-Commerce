import React, { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/authContext";

type Props = {
  children: React.ReactNode;
  authenticationRequired: boolean;
};

const UserAuthLayout: FC<Props> = ({
  children,
  authenticationRequired = false,
}) => {
  const userToken = Cookies.get("userToken");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authenticationRequired && !userToken) {
      navigate("/sign-in");
    } else if (!authenticationRequired && userToken) {
      navigate("/");
    }
    setLoading(false);
  }, [authenticationRequired, userToken, navigate]);

  return loading ? "Loading..." : children;
};

export default UserAuthLayout;
