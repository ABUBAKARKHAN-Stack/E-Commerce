import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { ShoppingCart, AlertCircle, RefreshCw, Home, LayoutDashboardIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggler } from "@/components/reusable/shared";
import { getErrorTitle } from "@/utils/error/getErrorTitle";

type ErrorLayoutProps = {
  icon?: ReactNode;
  title?: string;
  message?: string;
  status?: number;
  onRetry?: () => void;
  showContinue?: boolean;
  forAdmin?: boolean
};

const ErrorLayout: FC<ErrorLayoutProps> = ({
  icon = (
    <ShoppingCart className="h-16 w-16 text-gray-900 dark:text-gray-300" />
  ),
  title,
  message = "Something went wrong. Please try again later.",
  status = 500,
  onRetry,
  showContinue = true,
  forAdmin = false
}) => {
  const navigate = useNavigate();
  const timeourRef = useRef<NodeJS.Timeout | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await new Promise(() => {
        timeourRef.current = setTimeout(() => {
          if (onRetry) return onRetry();
          navigate(0);
        }, 1000);
      });
    } catch (error) {
    } finally {
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeourRef.current) {
        clearTimeout(timeourRef.current);
      }
    };
  }, []);

  return (
    <>
      <main className="xsm:px-0 bg-background flex h-full min-h-screen w-full min-w-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-lg border bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] p-8 text-center shadow-lg backdrop-blur-sm dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              {icon}
              <div className="absolute -top-2 -right-2 rounded-full bg-cyan-600 p-1 dark:bg-orange-600">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-gray-950 dark:text-white">
            {title || getErrorTitle(status)}
          </h1>

          <div className="text-muted-foreground mb-4 text-sm">
            Error Code: {status}
          </div>

          <p className="mb-6 text-gray-900 dark:text-gray-300">{message}</p>

          <div className="space-y-3">
            <Button
              disabled={isRetrying}
              onClick={handleRetry}
              className="flex w-full items-center justify-center gap-2 py-5"
            >
              <RefreshCw
                className={`size-5 ${isRetrying ? "animate-spin" : "animate-none"}`}
              />
              {isRetrying ? "Retrying..." : "Try Again"}
            </Button>

            {
              forAdmin ? (
                <Button className="hover:!bg-accent hover:!text-accent-foreground !text-accent !bg-accent-foreground w-full border">
                  <Link
                    to="/admin/dashboard"
                    className="flex w-full items-center justify-center gap-2"
                  >
                    <LayoutDashboardIcon className="h-4 w-4" />
                    Go to Dashboard
                  </Link>
                </Button>
              ) : (
                <Button className="hover:!bg-accent hover:!text-accent-foreground !text-accent !bg-accent-foreground w-full border">
                  <Link
                    to="/"
                    className="flex w-full items-center justify-center gap-2"
                  >
                    <Home className="h-4 w-4" />
                    Go to Home
                  </Link>
                </Button>
              )
            }

            {showContinue && (
              <Button variant={"outline"} className="w-full p-5">
                <Link
                  to="/products"
                  className="flex w-full items-center justify-center gap-2"
                >
                  <ShoppingCart className="!size-5" />
                  Continue Shopping
                </Link>
              </Button>
            )}
          </div>
        </div>
      </main>

      <ThemeToggler />
    </>
  );
};

export default ErrorLayout;
