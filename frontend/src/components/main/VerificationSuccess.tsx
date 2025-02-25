import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { BadgeCheckIcon } from 'lucide-react'

const VerificationSuccess = () => {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            {/* Success Icon */}
            <div className="dark:text-green-500 text-green-600 hover:text-green-700/90 dark:hover:text-green-600/90 mb-6">
                <BadgeCheckIcon className='w-24 h-24' />
            </div>

            {/* Success Message */}
            <h1 className="text-2xl font-bold text-[#1B1B1F] dark:text-white mb-2 text-center">
                Email Verified Successfully!
            </h1>

            <p className="text-[#17171b] dark:text-gray-200 text-xs xs:text-lg text-center mb-6">
                Your email address has been successfully verified. You can now log in and access your account.
            </p>

            {/* Redirect to Sign In */}
            <Link to="/sign-in">
                <Button className="text-sm px-6 py-3 rounded-md shadow-md tracking-wide transition-colors duration-200">
                    Go to Sign In
                </Button>
            </Link>

        </div>
    )
}

export default VerificationSuccess