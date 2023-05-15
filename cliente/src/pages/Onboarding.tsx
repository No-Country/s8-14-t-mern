import { Link } from "react-router-dom"

export default function Onboarding(): JSX.Element {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <Link to="/auth/login" >Login</Link>
      <Link to="/auth/register" >Register</Link>
    </div>
  )
}
