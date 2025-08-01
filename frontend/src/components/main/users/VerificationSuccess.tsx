import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon } from "lucide-react";

const VerificationSuccess = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {/* Success Icon */}
      <div className="mb-6 text-green-600 hover:text-green-700/90 dark:text-green-500 dark:hover:text-green-600/90">
        <BadgeCheckIcon className="h-24 w-24" />
      </div>

      {/* Success Message */}
      <h1 className="mb-2 text-center text-2xl font-bold text-[#1B1B1F] dark:text-white">
        Email Verified Successfully!
      </h1>

      <p className="xs:text-lg mb-6 text-center text-xs text-[#17171b] dark:text-gray-200">
        Your email address has been successfully verified. You can now log in
        and access your account.
      </p>

      {/* Redirect to Sign In */}
      <Link to="/sign-in">
        <Button className="rounded-md px-6 py-3 text-sm tracking-wide shadow-md transition-colors duration-200">
          Go to Sign In
        </Button>
      </Link>
    </div>
  );
};

export default VerificationSuccess;
