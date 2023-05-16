import { useParams } from "react-router-dom"
import LoginForm from "../components/LoginFormComponent"
import RegisterForm from "../components/RegisterFormComponent"


export default function AuthPage(): JSX.Element {
  const { slug } = useParams()

  return (
    <main>
      {slug === "login" ? <LoginForm /> : <RegisterForm />}
    </main>
  )
}