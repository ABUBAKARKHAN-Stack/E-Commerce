import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HomePage, SignInPage, SignUpPage, AboutPage, ProductsPage, ErrorPage, EmailVerificationPAge, ProfilePage, UserDashboardPage, AdminSignUpPage, AdminSignInPage, AdminDashboardPage, AdminAddProductPage } from '@/pages'
import { ThemeProvider } from '@/context/themeContext'
import { UserAuthLayout } from '@/components/reusable'
import AdminAuthLayout from './components/reusable/layout/AdminAuthLayout'
import { AuthProvider } from './context/authContext'
import AdminProductsPage from './pages/AdminProductsPage'



const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
  },
  // Public Routes (No Auth Required For Users)
  {
    path: "/",
    element: (
      <AdminAuthLayout authenticationRequired={false}>
        <HomePage />
      </AdminAuthLayout>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <UserAuthLayout authenticationRequired={false}>
        <AdminAuthLayout authenticationRequired={false}>
          <SignInPage />
        </AdminAuthLayout>
      </UserAuthLayout>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <UserAuthLayout authenticationRequired={false}>
        <AdminAuthLayout authenticationRequired={false}>
          <SignUpPage />
        </AdminAuthLayout>
      </UserAuthLayout>
    ),
  },
  {
    path: "/user/verify/:email/:token",
    element: (
      <UserAuthLayout authenticationRequired={false}>
        <EmailVerificationPAge />
      </UserAuthLayout>
    ),
  },
  {
    path: "/about",
    element:
      <AdminAuthLayout authenticationRequired={false}>
        <AboutPage />
      </AdminAuthLayout>
  },
  {
    path: "/products",
    element: (
      <AdminAuthLayout authenticationRequired={false}>
        <ProductsPage />
      </AdminAuthLayout>
    ),
  },

  // Protected Routes (Require Auth For Users)
  {
    path: "/user/dashboard/profile/:name",
    element: (
      <UserAuthLayout authenticationRequired={true}>
        <ProfilePage />
      </UserAuthLayout>
    ),
  },
  {
    path: "/user/dashboard",
    element: (
      <UserAuthLayout authenticationRequired={true}>
        <UserDashboardPage />
      </UserAuthLayout>
    ),
  },

  // Public Routes (No Auth Required For Admin)
  {
    path: "/admin/sign-up",
    element: <AdminAuthLayout authenticationRequired={false}>
      <UserAuthLayout authenticationRequired={false}>
        <AdminSignUpPage />
      </UserAuthLayout>
    </AdminAuthLayout>
  },
  {
    path: "/admin/sign-in",
    element:
      <AdminAuthLayout authenticationRequired={false}>
        <UserAuthLayout authenticationRequired={false}>
          <AdminSignInPage />
        </UserAuthLayout>
      </AdminAuthLayout>
  },
  {
    path: "/admin/dashboard",
    element: <AdminAuthLayout authenticationRequired={true}>
      <AdminDashboardPage />
    </AdminAuthLayout>
  },
  {
    path: "/admin/products",
    element: <AdminAuthLayout authenticationRequired={true}>
      <AdminProductsPage />
    </AdminAuthLayout>
  },
  {
    path: "/admin/products/add",
    element: <AdminAuthLayout authenticationRequired={true}>
      <AdminAddProductPage />
    </AdminAuthLayout>
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode >,
)