import { AdminViewProductMain } from '@/components/main';
import { ThemeToggler } from '@/components/reusable';
import { Toaster } from 'sonner';

const AdminViewProductPage = () => {
    const theme = localStorage.getItem('theme');

  return (
    <>
    <ThemeToggler />
    <Toaster theme={theme as "dark" | "light"} />
    <AdminViewProductMain />
    </>
  )
}

export default AdminViewProductPage