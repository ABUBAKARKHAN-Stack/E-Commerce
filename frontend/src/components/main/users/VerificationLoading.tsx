import { PartyPopperIcon } from 'lucide-react'
import { FC } from 'react'
type Props = {
    email: string
}

const VerificationLoading: FC<Props> = ({ email }) => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="text-cyan-500 hover:text-cyan-600/90 dark:text-orange-500 dark:hover:text-orange-600/90 animate-pulse mb-6">
                <PartyPopperIcon className='w-24 h-24' />
            </div>
            <h1 className="text-2xl font-bold text-[#1B1B1F] dark:text-white mb-2 text-center">
                Please Wait...
            </h1>
            <p className="text-[#17171b] dark:text-gray-200 text-xs text-nowrap xs:text-lg text-center mb-6">
                Verifying your Email: <span className='font-semibold'>{email}</span>
            </p>
        </div>
    )
}

export default VerificationLoading