import { BadgeX } from 'lucide-react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

type Props = {
    error: string
}

const VerificationError: FC<Props> = ({ error }) => {
    
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            {/* Error Icon */}
            <div className="dark:text-red-500 text-red-600 hover:text-red-700/90 dark:hover:text-red-600/90 mb-6">
                <BadgeX className="w-24 h-24" />
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-bold text-[#1B1B1F] dark:text-white mb-4 text-center">
                {
                    error === "User already verified" ? "Email Already Verified" : "Session Expired"
                }
            </h1>

            <p className="text-[#17171b] dark:text-gray-200 text-sm xs:text-lg text-center max-w-md mb-6">
                {
                    error === "User already verified" ? "Your email address has already been verified." : "Your session has expired. Please log in again to verify your email."
                }
            </p>

            {/* Error Details (Optional for Debugging, Hidden by Default) */}
            {error && (
                <p className="text-[#17171b] dark:text-gray-300 text-xs xs:text-sm text-center font-mono font-semibold mb-6 opacity-90 hover:opacity-100 transition-opacity duration-200 cursor-help">
                    Error: {error || "An unexpected error occurred."}
                </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:space-x-4">
                <Link to="/sign-in">
                    <Button className=" text-sm px-6 py-3 rounded-md shadow-md tracking-wide transition-colors duration-200">
                        Go to Sign In
                    </Button>
                </Link>
                <Button
                    // onClick={() => verifyUser(email, token)}
                    className="text-sm px-6 py-3 rounded-md shadow-md tracking-wide transition-colors duration-200"
                >
                    Resend Verification Link
                </Button>
            </div>
        </div>
    )
}

export default VerificationError