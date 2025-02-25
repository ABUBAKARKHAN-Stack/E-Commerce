import { Layout, ThemeToggler } from '@/components/reusable';
import { useParams } from 'react-router-dom'
import { verifyUser } from '@/API/userApi';
import { useEffect, useRef, useState } from 'react';
import { VerificationError, VerificationLoading, VerificationSuccess } from '@/components/main'
import { infoToast } from '@/utils/toastNotifications';

const EmailVerificationPage = () => {
    const { email, token } = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const hasRequested = useRef<boolean>(false)
    const loadingTimeout = useRef<NodeJS.Timeout | null>(null)

    if (!email || !token) {
        return <div>Invalid link</div>
    }

    const verifyUserHandler = async () => {
        try {
            setLoading(true)
            await verifyUser(email, token)
            setSuccess(true)
        } catch (error: any) {
            

            setSuccess(false)
            const errorMsg = error.response.data.message || 'Something went wrong';
            setError(errorMsg)
        } finally {
            loadingTimeout.current = setTimeout(() => {
                setLoading(false)
            }, 1000);
        }
    }
    useEffect(() => {
        if (hasRequested.current) return
        hasRequested.current = true
        verifyUserHandler()

        return () => {
            if (loadingTimeout.current) {
                clearTimeout(loadingTimeout.current)
            }
        }
    }, [email, token])


    return (
        <Layout>
            <ThemeToggler />
            <div className="flex items-center justify-center h-screen">
                <div className="p-6 w-full h-full rounded-lg shadow-lg text-center">
                    {loading && (
                        <VerificationLoading email={email} />
                    )}

                    {error && (
                        <VerificationError error={error} />
                    )}
                    {success && (
                        <VerificationSuccess />
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default EmailVerificationPage