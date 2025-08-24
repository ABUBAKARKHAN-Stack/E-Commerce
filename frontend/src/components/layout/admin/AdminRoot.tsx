import { AdminProductProvider } from "@/context/adminProduct.context";
import { Outlet } from "react-router-dom";
import AdminAuthLayout from "./AdminAuthLayout";
import { AdminOrderProvider } from "@/context/adminOrder.context";

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
