import { ErrorLayout } from '@/components/layout/shared';
import { ApiErrorType } from '@/types/main.types';
import { User2 } from 'lucide-react';
import { useRouteError } from 'react-router-dom';

const UserProfileErrorPage = () => {
    const error = useRouteError() as ApiErrorType;



    return (
        <ErrorLayout
            icon={<User2 className="w-16 h-16 text-gray-900 dark:text-gray-300" />}
            status={error.status}
            message={error.message}
        />
    );
}

export default UserProfileErrorPage