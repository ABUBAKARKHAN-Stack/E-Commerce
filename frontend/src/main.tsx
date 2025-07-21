import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  ErrorPage,
} from '@/pages/shared' //* Shared Pages
import {
  AdminSignUpPage,
  AdminSignInPage,
  AdminDashboardPage,
  AdminAddProductPage,
  AdminUpdateProductPage,
  AdminViewProductPage,
  AdminProductsPage,
  AdminForgotPasswordPage,
  AdminResetPasswordPage
} from '@/pages/admin' //* Admin Pages
import {
  HomePage,
  AboutPage,
  ProductsPage,
  UserSignInPage,
  UserSignUpPage,
  UserDashboardPage,
  UserForgotPasswordPage,
  UserProfilePage,
  UserEmailVerificationPage,
  UserResetPasswordPage,
  CartPage,
  ProductPage,
  WishlistPage,
  CheckoutPage
} from '@/pages/users' //* User Pages
import { ThemeProvider } from '@/context/themeContext'
import { UserAuthLayout } from '@/components/layout/user'
import { AdminAuthLayout, AdminRoot } from '@/components/layout/admin'
import { AuthProvider } from '@/context/authContext'
import { ProductProvider } from '@/context/productContext'
import { cartLoader } from '@/utils/loaders/cartLoader'
import { CartErrorPage, CheckoutErrorPage } from '@/pages/users/error'
import { wishlistLoader } from './utils/loaders/wishlistLoader'
import WishlistErrorPage from './pages/users/error/WishlistErrorPage'
import { orderDetailsLoader } from './utils/loaders/orderDetailsLoader'



const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />, //! Error Page (Shared Page)
  },
  //! Public Routes (No Auth Required For Users)
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
          <UserSignInPage />
        </AdminAuthLayout>
      </UserAuthLayout>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <UserAuthLayout authenticationRequired={false}>
        <AdminAuthLayout authenticationRequired={false}>
          <UserSignUpPage />
        </AdminAuthLayout>
      </UserAuthLayout>
    ),
  },
  {
    path: "/user/verify/:email/:token",
    element: (
      <UserAuthLayout authenticationRequired={false}>
        <UserEmailVerificationPage />
      </UserAuthLayout>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <UserAuthLayout authenticationRequired={false}>
        <UserForgotPasswordPage />
      </UserAuthLayout>
    )
  },
  {
    path: "/user/reset-password",
    element: (
      <UserAuthLayout authenticationRequired={false}>
        <UserResetPasswordPage />
      </UserAuthLayout>
    )
  },
  {
    path: "/about",
    element: (
      <AdminAuthLayout authenticationRequired={false}>
        <AboutPage />
      </AdminAuthLayout>
    )
  },
  {
    path: "/products",
    element: (
      <AdminAuthLayout authenticationRequired={false}>
        <ProductsPage />
      </AdminAuthLayout>
    ),
  },
  {
    path: "/products/:productId",
    element: (
      <AdminAuthLayout authenticationRequired={false}>
        <ProductPage />
      </AdminAuthLayout>
    ),
  },

  //! Protected Routes (Require Auth For Users)
  {
    path: "/user/dashboard",
    element: (
      <UserAuthLayout authenticationRequired={true}>
        <UserDashboardPage />
      </UserAuthLayout>
    ),
  },
  {
    path: "/user/dashboard/profile/:name",
    element: (
      <UserAuthLayout authenticationRequired={true}>
        <UserProfilePage />
      </UserAuthLayout>
    ),
  },
  {
    path: '/cart',
    element: <UserAuthLayout authenticationRequired>
      <CartPage />
    </UserAuthLayout>,
    loader: cartLoader,
    errorElement: <CartErrorPage />
  },
  {
    path: '/checkout',
    element: <UserAuthLayout authenticationRequired>
      <CheckoutPage />
    </UserAuthLayout>,
    loader: orderDetailsLoader,
    errorElement: <CheckoutErrorPage />
  },
  {
    path: '/wishlist',
    element: <UserAuthLayout authenticationRequired>
      <WishlistPage />
    </UserAuthLayout>,
    loader: wishlistLoader,
    errorElement: <WishlistErrorPage />
  },

  //! Public Routes (No Auth Required For Admin)
  {
    path: "/admin/sign-up",
    element: (
      <AdminAuthLayout authenticationRequired={false}>
        <UserAuthLayout authenticationRequired={false}>
          <AdminSignUpPage />
        </UserAuthLayout>
      </AdminAuthLayout>
    )
  },
  {
    path: "/admin/sign-in",
    element: (
      <AdminAuthLayout authenticationRequired={false}>
        <UserAuthLayout authenticationRequired={false}>
          <AdminSignInPage />
        </UserAuthLayout>
      </AdminAuthLayout>
    )
  },
  {
    path: "/admin/forgot-password",
    element: (
      <AdminForgotPasswordPage />
    )
  },
  {
    path: "/admin/reset-password",
    element: (
      <AdminResetPasswordPage />
    )
  },
  //! Protected Routes (Require Auth for Admins)
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboardPage />
      },
      {
        path: 'products',
        element: <AdminProductsPage />

      },
      {
        path: 'products/add',
        element: <AdminAddProductPage />
      },
      {
        path: 'products/edit/:id',
        element: <AdminUpdateProductPage />
      },
      {
        path: 'products/product/:id',
        element: <AdminViewProductPage />
      },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ProductProvider>
          <RouterProvider router={router} />
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode >,
)