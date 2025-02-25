import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HomePage, SignInPage, SignUpPage, AboutPage, ProductsPage, ErrorPage, EmailVerificationPAge } from './pages'
import { ThemeProvider } from './context/themeContext'
import { AuthLayout } from './components/reusable'
import { UserProvider } from './context/userContext'


const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <AuthLayout authenticationRequired={false}>
      <ThemeProvider>
        <UserProvider>
          <HomePage />
        </UserProvider>
      </ThemeProvider>
    </AuthLayout>,
  },
  {
    path: "/sign-in",
    element: <AuthLayout authenticationRequired={false}>
      <ThemeProvider>
        <SignInPage />
      </ThemeProvider>
    </AuthLayout>,
  },
  {
    path: "/sign-up",
    element: <AuthLayout authenticationRequired={false}>
      <ThemeProvider>
        <SignUpPage />
      </ThemeProvider>
    </AuthLayout>,
  },
  {
    path: "/user/verify/:email/:token",
    element: <AuthLayout authenticationRequired={false}>
      <ThemeProvider>
        <EmailVerificationPAge />
      </ThemeProvider>
    </AuthLayout>,
  },
  {
    path: "/about",
    element: <AuthLayout authenticationRequired={false} >
      <AboutPage />
    </AuthLayout>,
  },
  {
    path: "/products",
    element: <AuthLayout authenticationRequired={true}>
      <ProductsPage />
    </AuthLayout>,
  },
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode >,
)
