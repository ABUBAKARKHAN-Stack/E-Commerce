import { FormHeader, ResetPasswordForm } from "@/components/reusable/shared";
import { AdminWarning } from "@/components/reusable/admin";
import { IResetpasswordQueryParams } from "@/types/main.types";
import React, { FC } from "react";
import { Link } from "react-router-dom";

const AdminResetPasswordMain: FC<IResetpasswordQueryParams> = ({
  queryParameters,
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex max-w-[30rem] flex-col items-center justify-center rounded-2xl border-2 border-[#E5E7EB] bg-gradient-to-b from-[#ffffff] via-[#E5E7EB] to-[#F3F4F6] px-1 py-4 text-black shadow-2xl sm:p-4 md:max-w-[60%] lg:max-w-[45%] dark:border-[#27272A] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F] dark:text-white dark:shadow-2xl">
        {/* Header Section */}
        <FormHeader />

        {/* Signin Message */}
        <p className="xxs:text-sm xs:max-w-[90%] xs:text-lg mt-4 max-w-full text-center font-mono text-xs font-semibold text-[#1B1B1F] dark:text-gray-200">
          Almost there.Please enter a new password to reset your{" "}
          <span className="font-extrabold text-cyan-500 dark:text-orange-500">
            ShopNex
          </span>{" "}
          account.
        </p>

        {/* Signin Form */}
        <div className="xs:max-w-[92%] mt-6 mb-6 w-full max-w-[95%] px-1.5">
          <ResetPasswordForm isAdmin={true} queryParameters={queryParameters} />
        </div>

        {/* Sign-in Redirect */}
        <p className="xs:text-sm mt-3 max-w-[90%] text-center text-xs text-[#17171b] dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/admin/sign-up"
            className="font-medium text-cyan-400 underline transition-colors duration-200 hover:text-cyan-500 dark:text-orange-400 dark:hover:text-orange-500"
          >
            Sign up here
          </Link>
          .
        </p>

        {/* Admin Access Notice */}
        <AdminWarning />
      </div>
    </div>
  );
};

export default AdminResetPasswordMain;
