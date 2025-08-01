import { BadgeX } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Props = {
  error: string;
};

const VerificationError: FC<Props> = ({ error }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {/* Error Icon */}
      <div className="mb-6 text-red-600 hover:text-red-700/90 dark:text-red-500 dark:hover:text-red-600/90">
        <BadgeX className="h-24 w-24" />
      </div>

      {/* Error Message */}
      <h1 className="mb-4 text-center text-2xl font-bold text-[#1B1B1F] dark:text-white">
        {error === "User already verified"
          ? "Email Already Verified"
          : "Session Expired"}
      </h1>

      <p className="xs:text-lg mb-6 max-w-md text-center text-sm text-[#17171b] dark:text-gray-200">
        {error === "User already verified"
          ? "Your email address has already been verified."
          : "Your session has expired. Please log in again to verify your email."}
      </p>

      {/* Error Details (Optional for Debugging, Hidden by Default) */}
      {error && (
        <p className="xs:text-sm mb-6 cursor-help text-center font-mono text-xs font-semibold text-[#17171b] opacity-90 transition-opacity duration-200 hover:opacity-100 dark:text-gray-300">
          Error: {error || "An unexpected error occurred."}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:space-x-4">
        <Link to="/sign-in">
          <Button className="rounded-md px-6 py-3 text-sm tracking-wide shadow-md transition-colors duration-200">
            Go to Sign In
          </Button>
        </Link>
        <Button
          // onClick={() => verifyUser(email, token)}
          className="rounded-md px-6 py-3 text-sm tracking-wide shadow-md transition-colors duration-200"
        >
          Resend Verification Link
        </Button>
      </div>
    </div>
  );
};

export default VerificationError;
