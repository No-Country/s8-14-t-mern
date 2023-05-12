import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AuthRoutes from './AuthRoutes';
import Onboarding from '../pages/Onboarding';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';



export default function AppRouter() {
  // let status = 'loading'
  // let status = 'yatengocuenta'
  let status = 'notengocuenta'
  // let status = 'authenticated'
  return (
    <Routes>
      {(status === 'loading') &&
        <Route path='/' element={<Onboarding />} />
      }

      {(status === 'yatengocuenta') &&
        <Route path='/auth/login' element={<LoginPage />} />
      }

      {(status === 'notengocuenta') &&
        <Route path='/auth/register' element={<RegisterPage />} />
      }

      {
        (status === 'authenticated') &&
        <Route path='/home' element={<HomePage />} />
      }
      {/* Ruta de protecion, en caso de que el usuario quiera ir a una direccion que invente */}
      {/* <Route path='/*' element={<Navigate to='auth/login' />} /> */}
      {/* <Route path='*' element={<h1>404</h1>} /> */}
    </Routes>
  )

}
