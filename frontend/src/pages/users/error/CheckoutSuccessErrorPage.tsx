import { ErrorLayout } from "@/components/layout/shared";
import { ApiErrorType } from "@/types/main.types";
import { CheckCircle } from "lucide-react";
import { useRouteError } from "react-router-dom";

const CheckoutSuccessErrorPage = () => {
  const error = useRouteError() as ApiErrorType;

  return (
    <ErrorLayout
      icon={
        <CheckCircle className="h-16 w-16 text-gray-900 dark:text-gray-300" />
      }
      status={error.status}
      message={error.message}
    />
  );
};

export default CheckoutSuccessErrorPage;
