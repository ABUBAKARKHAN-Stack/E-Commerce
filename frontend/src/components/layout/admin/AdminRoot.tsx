import { AdminProductProvider } from "@/context/adminProductContext";
import { Outlet } from "react-router-dom";
import AdminAuthLayout from "./AdminAuthLayout";
import { AdminOrderProvider } from "@/context/adminOrderContext";

const AdminRoot = () => {
  return (
    <AdminAuthLayout authenticationRequired={true}>
      <AdminProductProvider>
        <AdminOrderProvider>
          <Outlet />
        </AdminOrderProvider>
      </AdminProductProvider>
    </AdminAuthLayout>
  );
};

export default AdminRoot;
