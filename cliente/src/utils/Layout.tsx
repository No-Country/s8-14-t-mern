import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="pb-20">
        <Outlet />
      </main>
      <NavBar />
    </>
  );
}
