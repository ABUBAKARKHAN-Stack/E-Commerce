import { ErrorLayout } from '@/components/layout/shared';
import { ApiErrorType } from '@/types/main.types';
import { Package } from 'lucide-react';
import React from 'react'
import { useRouteError } from 'react-router-dom';

const UserOrderErrorPage = () => {

    const error = useRouteError() as ApiErrorType;



    return (
        <ErrorLayout
            icon={<Package className="w-16 h-16 text-gray-900 dark:text-gray-300" />}
            status={error.status}
            message={error.message}
        />
    );

}

export default UserOrderErrorPage