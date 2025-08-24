import { Button } from "@/components/ui/button";
import { ApiErrorType } from "@/types/main.types";
import { AxiosError } from "axios";
import { AlertTriangle, RefreshCcw } from "lucide-react";

const ViewProductErrorState = ({
  onRetry,
  isRefetching,
  error,
}: {
  onRetry?: () => void;
  isRefetching: boolean;
  error: AxiosError<ApiErrorType, any> | null;
}) => {
  const errMsg =
    error?.response?.data.message ||
    "Something went wrong while loading the product details.";
  return (
    <div className="mt-4 flex flex-col items-center justify-center py-8 text-center">
      <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
        <AlertTriangle className="text-destructive-foreground" />
      </div>
      <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
        Failed to load product
      </h3>
      <p className="mt-1 text-sm text-gray-900 dark:text-gray-300">{errMsg}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          className="mt-4"
          disabled={isRefetching}
          size={"lg"}
        >
          <RefreshCcw
            className={`${isRefetching ? "animate-spin" : "animated-none"}`}
          />
          Try again
        </Button>
      )}
    </div>
  );
};

export default ViewProductErrorState;
