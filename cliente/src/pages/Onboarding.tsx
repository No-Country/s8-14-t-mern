import { useNavigate } from "react-router-dom"

export default function Onboarding() {
  const navigate = useNavigate();

  const onHandleRegister = () => {
    navigate('auth/register')
  }

  const onHandleLogin = () => {
    navigate('auth/login')
  }
  return (
    <div>
      <button onClick={onHandleRegister}>Crear cuenta</button>
      <button onClick={onHandleLogin}>Ya tengo cuenta</button>
    </div>
  )
}
