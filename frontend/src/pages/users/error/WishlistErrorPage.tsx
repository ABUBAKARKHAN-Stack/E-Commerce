import { ErrorLayout } from '@/components/layout/shared'
import { ApiErrorType } from '@/types/main.types'
import { Heart } from 'lucide-react'
import { useRouteError } from 'react-router-dom'

const WishlistErrorPage = () => {
    const error = useRouteError() as ApiErrorType;
    return (
        <ErrorLayout
            icon={<Heart className="w-16 h-16 text-gray-900 dark:text-gray-300" />}
            status={error.status}
            message={error.message}
        />
    )
}

export default WishlistErrorPage