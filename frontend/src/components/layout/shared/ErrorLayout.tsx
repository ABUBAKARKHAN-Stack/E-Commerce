import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { ShoppingCart, AlertCircle, RefreshCw, Home } from "lucide-react";
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
};

const ErrorLayout: FC<ErrorLayoutProps> = ({
    icon = <ShoppingCart className="w-16 h-16 text-gray-900 dark:text-gray-300" />,
    title,
    message = "Something went wrong. Please try again later.",
    status = 500,
    onRetry,
    showContinue = true,
}) => {
    const navigate = useNavigate();
    const timeourRef = useRef<NodeJS.Timeout | null>(null);
    const [isRetrying, setIsRetrying] = useState(false);

    const handleRetry = async () => {
        setIsRetrying(true)
        try {
            await new Promise(() => {
                timeourRef.current = setTimeout(() => {
                    if (onRetry) return onRetry();
                    navigate(0);
                }, 1000);
            })
        } catch (error) {
        } finally {
            setIsRetrying(false)
        }

    };



    useEffect(() => {
        return () => {
            if (timeourRef.current) {
                clearTimeout(timeourRef.current)
            }
        }
    }, [])

    return (
        <>
            <main className="min-w-screen w-full px-4 xsm:px-0 min-h-screen h-full flex flex-col items-center justify-center bg-background">
                <div className="max-w-lg w-full bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F] backdrop-blur-sm rounded-lg shadow-lg p-8 text-center border">

                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            {icon}
                            <div className="absolute -top-2 -right-2 bg-cyan-600 dark:bg-orange-600 rounded-full p-1">
                                <AlertCircle className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-950 dark:text-white mb-2">
                        {title || getErrorTitle(status)}
                    </h1>

                    <div className="text-sm text-muted-foreground mb-4">
                        Error Code: {status}
                    </div>

                    <p className="text-gray-900 dark:text-gray-300 mb-6">{message}</p>

                    <div className="space-y-3">
                        <Button
                            disabled={isRetrying}
                            onClick={handleRetry}
                            className="w-full flex items-center py-5 justify-center gap-2"
                        >
                            <RefreshCw className={`size-5 ${isRetrying ? "animate-spin" : 'animate-none'}`} />
                            {isRetrying ? "Retrying..." : "Try Again"}
                        </Button>

                        <Button className="w-full hover:!bg-accent hover:!text-accent-foreground !text-accent border !bg-accent-foreground">
                            <Link
                                to="/"
                                className="w-full flex items-center justify-center gap-2"
                            >
                                <Home className="w-4 h-4" />
                                Go to Home
                            </Link>
                        </Button>

                        {showContinue && (
                            <Button variant={"outline"} className="w-full p-5">
                                <Link
                                    to="/products"
                                    className="w-full flex items-center justify-center gap-2"
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

export default ErrorLayout