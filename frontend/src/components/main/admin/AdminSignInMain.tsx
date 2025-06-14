import { SignInForm, FormHeader } from '@/components/reusable';

const AdminSignInMain = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
             <div className="flex flex-col bg-gradient-to-b from-[#ffffff] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F] rounded-2xl px-1 py-4 sm:p-4 border-2 border-[#E5E7EB] dark:border-[#27272A] shadow-2xl dark:shadow-2xl max-w-[30rem] md:max-w-[60%] lg:max-w-[45%] mx-auto items-center justify-center text-black dark:text-white">

                {/* Header Section */}
                <FormHeader />

                  {/* Admin Sign-in Message */}
                  <p className="text-xs xxs:text-sm max-w-full xs:max-w-[90%] xs:text-lg font-mono font-semibold mt-4 text-[#1B1B1F] dark:text-gray-200 text-center">
                    Only the authorized admin can sign in to manage <span className="font-extrabold text-cyan-500 dark:text-orange-500">ShopNex!</span>
                </p>

                {/* Signin Form */}
                <div className="w-full px-1.5 max-w-[95%] xs:max-w-[92%] mt-6 mb-6">
                    <SignInForm isAdmin={true} />
                </div>

                {/* Admin Access Notice */}
                <p className="text-xs xs:text-sm max-w-[90%] mt-3 text-center text-[#17171b]  dark:text-gray-300">
                    This platform has a single admin. If you are not the admin, you do not have access.
                </p>
            </div>
        </div>
    );
};

export default AdminSignInMain;
