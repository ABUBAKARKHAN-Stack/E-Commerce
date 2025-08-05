import { AdminOrderDetailsMain } from '@/components/main/admin'
import { ThemeToggler } from '@/components/reusable/shared'
import { useTheme } from 'next-themes'
import { Toaster } from 'sonner'

const AdminOrderDetailsPage = () => {
   const { resolvedTheme } = useTheme()
    return (
        <>
            <ThemeToggler />
            <AdminOrderDetailsMain />
            <Toaster theme={resolvedTheme as "dark" | "light"} />
        </>
    )
}

export default AdminOrderDetailsPage