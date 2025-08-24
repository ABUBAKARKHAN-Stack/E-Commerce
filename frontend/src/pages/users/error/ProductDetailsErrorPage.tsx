import { ErrorLayout } from "@/components/layout/shared";
import { ApiErrorType } from "@/types/main.types";
import { PackageX } from "lucide-react";
import { useRouteError } from "react-router-dom";

const ProductDetailsErrorPage = () => {
  const error = useRouteError() as ApiErrorType;
  return (
    <ErrorLayout
      icon={<PackageX className="h-16 w-16 text-gray-900 dark:text-gray-300" />}
      status={error.status}
      message={error.message}
    />
  );
};

export default ProductDetailsErrorPage;
