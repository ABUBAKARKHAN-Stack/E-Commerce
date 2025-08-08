import { ErrorLayout } from "@/components/layout/shared";
import { ApiErrorType } from "@/types/main.types";
import { Package } from "lucide-react";
import { useRouteError } from "react-router-dom";

const AdminOrderErrorPage = () => {
  const error = useRouteError() as ApiErrorType;

  return (
    <ErrorLayout
      icon={<Package className="h-16 w-16 text-gray-900 dark:text-gray-300" />}
      status={error.status}
      message={error.message}
      forAdmin
      showContinue={false}
    />
  );
};

export default AdminOrderErrorPage;
