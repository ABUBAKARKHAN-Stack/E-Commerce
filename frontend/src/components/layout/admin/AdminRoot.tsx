import { AdminProductProvider } from "@/context/adminProductContext";
import { Outlet } from "react-router-dom";
import AdminAuthLayout from "./AdminAuthLayout";

const AdminRoot = () => {
  return (
    <AdminAuthLayout authenticationRequired={true}>
      <AdminProductProvider>
        <Outlet />
      </AdminProductProvider>
    </AdminAuthLayout>
  );
};

export default AdminRoot;
