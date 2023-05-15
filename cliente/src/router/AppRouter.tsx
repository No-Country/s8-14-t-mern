import { Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
const Onboarding: React.LazyExoticComponent<() => JSX.Element> = lazy(() => import("../pages/Onboarding"))
const AuthPage: React.LazyExoticComponent<() => JSX.Element> = lazy(() => import("../pages/AuthPage"))
const HomePage: React.LazyExoticComponent<() => JSX.Element> = lazy(() => import("../pages/HomePage"))

export default function AppRouter(): JSX.Element {
  const user = false
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BrowserRouter>
        <Routes>
          {!user &&
            <>
              <Route path='/' element={<Onboarding />} />
              <Route path='/auth/:slug' element={<AuthPage />} />
              <Route path='*' element={<Navigate to="/" />} />
            </>
          }
          {user &&
            <>
              <Route path='/home' element={<HomePage />} />
              <Route path='*' element={<Navigate to="/home" />} />
            </>
          }
        </Routes>
      </BrowserRouter>
    </Suspense>
  )

}
