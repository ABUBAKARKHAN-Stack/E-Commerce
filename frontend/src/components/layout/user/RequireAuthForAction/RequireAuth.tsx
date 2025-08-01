import { useAuthContext } from "@/context/authContext";
import { FC, ReactNode, useState } from "react";
import RequireAuthForAction from "./RequireAuthDialog";

const RequireAuth: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuthContext();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const isUserLoggedIn = !!user && user.role === "user";

  if (!isUserLoggedIn) {
    return (
      <>
        <div onClick={() => setDialogOpen(true)} className="w-full">
          {children}
        </div>
        <RequireAuthForAction open={dialogOpen} onOpenChange={setDialogOpen} />
      </>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
