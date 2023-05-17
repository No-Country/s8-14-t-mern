import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/AuthPage'
import RegisterPage from '../components/RegisterFormComponent'

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      {/* En caso de que escriba cualquier direccion seguida del localhost */}
      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
