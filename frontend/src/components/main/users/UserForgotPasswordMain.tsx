import React from "react";
import { FormHeader, ForgotPasswordForm } from "@/components/reusable/shared";

const UserForgotPasswordMain = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex max-w-[30rem] flex-col items-center justify-center rounded-2xl border-2 border-[#E5E7EB] bg-gradient-to-b from-[#ffffff] via-[#E5E7EB] to-[#F3F4F6] px-1 py-4 text-black shadow-2xl sm:p-4 md:max-w-[60%] lg:max-w-[55%] dark:border-[#27272A] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F] dark:text-white dark:shadow-2xl">
        {/* Header Section */}
        <FormHeader />

        {/* Signin Message */}
        <p className="xxs:text-sm xs:max-w-[90%] xs:text-lg mt-4 max-w-full text-center font-mono text-xs font-semibold text-[#1B1B1F] dark:text-gray-200">
          Enter your registered email address or phone number to reset your {""}
          <span className="font-extrabold text-cyan-500 dark:text-orange-500">
            ShopNex
          </span>{" "}
          password.
        </p>

        {/* ForgotPassword Form */}
        <div className="xs:max-w-[92%] mt-6 mb-6 w-full max-w-[95%] px-1.5">
          <ForgotPasswordForm isAdmin={false} />
        </div>
      </div>
    </div>
  );
};

export default UserForgotPasswordMain;
