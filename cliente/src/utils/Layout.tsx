import { PropsWithChildren } from 'react'
import NavBar from '../components/NavBar'
export default function Layout({ children }: PropsWithChildren) {
  return (
    <main>
      {children}
      <NavBar />
    </main>
  )
}