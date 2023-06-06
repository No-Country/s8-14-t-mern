import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
export default function Layout() {
  return (
    <>
      <main className="pb-20">
        <Outlet />
      </main>
      <NavBar />
    </>
  );
}
