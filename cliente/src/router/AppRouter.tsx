import { PropsWithChildren, Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
const Layout: React.LazyExoticComponent<({ children }: PropsWithChildren ) => JSX.Element> = lazy(() => import("../utils/Layout"))
const Onboarding: React.LazyExoticComponent<() => JSX.Element> = lazy(() => import("../pages/Onboarding"))
const AuthPage: React.LazyExoticComponent<() => JSX.Element> = lazy(() => import("../pages/AuthPage"))
const HomePage: React.LazyExoticComponent<() => JSX.Element> = lazy(() => import("../pages/HomePage"))

export default function AppRouter(): JSX.Element {
  const user = true
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BrowserRouter>
        {!user &&
          <Routes>
            <>
              <Route path='/' element={<Onboarding />} />
              <Route path='/auth/:slug' element={<AuthPage />} />
              <Route path='*' element={<Navigate to="/" />} />
            </>
          </Routes>
        }
        {user &&
          <Layout>
            <Routes>
              <>
                <Route path='/home' element={<HomePage />} />
                <Route path='*' element={<Navigate to="/home" />} />
              </>
            </Routes>
          </Layout>
        }
      </BrowserRouter>
    </Suspense>
  )

}
