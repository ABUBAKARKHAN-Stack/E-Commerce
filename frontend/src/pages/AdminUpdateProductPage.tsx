import { AdminUpdateProductMain } from '@/components/main'
import { ThemeToggler } from '@/components/reusable'
import { Toaster } from 'sonner'

const AdminUpdateProductPage = () => {
    const theme = localStorage.getItem('theme');
  return (
    <>
    <ThemeToggler />
    <Toaster theme={theme as "dark" | "light"} />
    <AdminUpdateProductMain />
    </>
  )
}

export default AdminUpdateProductPage