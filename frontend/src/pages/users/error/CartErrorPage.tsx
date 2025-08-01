import { ErrorLayout } from "@/components/layout/shared";
import { ApiErrorType } from "@/types/main.types";
import { ShoppingCart } from "lucide-react";
import { useRouteError } from "react-router-dom";

const CartErrorPage = () => {
  const error = useRouteError() as ApiErrorType;

  return (
    <ErrorLayout
      icon={
        <ShoppingCart className="h-16 w-16 text-gray-900 dark:text-gray-300" />
      }
      status={error.status}
      message={error.message}
    />
  );
};

export default CartErrorPage;
