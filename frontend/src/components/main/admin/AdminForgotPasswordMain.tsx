import { ForgotPasswordForm, FormHeader } from '@/components/reusable/shared'
import { AdminWarning } from '@/components/reusable/admin'

const AdminForgotPasswordMain = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex flex-col bg-gradient-to-b from-[#ffffff] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F] rounded-2xl px-1 py-4 sm:p-4 border-2 border-[#E5E7EB] dark:border-[#27272A] shadow-2xl dark:shadow-2xl max-w-[30rem] md:max-w-[60%] lg:max-w-[55%] mx-auto items-center justify-center text-black dark:text-white">

                {/* Header Section */}
                <FormHeader />

                {/* ForgotPassword Message */}
                <p className="text-xs xxs:text-sm max-w-full xs:max-w-[90%] xs:text-lg font-mono font-semibold mt-4 text-[#1B1B1F] dark:text-gray-200 text-center">
                    Enter your registered admin email address or phone number to reset your {" "}
                    <span className="font-extrabold text-cyan-500 dark:text-orange-500">ShopNex</span>
                    {" "}
                    admin password.
                </p>


                {/* ForgotPassword Form */}
                <div className="w-full px-1.5 max-w-[95%] xs:max-w-[92%] mt-6 mb-6">
                    <ForgotPasswordForm isAdmin={true} />
                </div>

                {/* Admin Access Notice */}
               <AdminWarning />
            </div>
        </div>
    )
}

export default AdminForgotPasswordMain