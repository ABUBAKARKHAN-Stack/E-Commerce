import { AdminAddProductMain } from '@/components/main'
import { ThemeToggler } from '@/components/reusable'
import { Toaster } from 'sonner'

const AdminAddProductPage = () => {
    const theme = localStorage.getItem('theme');
  return (
    <>
    <ThemeToggler />
    <Toaster theme={theme as "dark" | "light"} />
    <AdminAddProductMain />
    </>
  )
}

export default AdminAddProductPage