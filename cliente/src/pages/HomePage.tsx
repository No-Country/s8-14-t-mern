import { Outlet } from "react-router-dom";
import Benefits from "@/components/BenefitHomeComponent";
import PanelHome from "@/components/PanelHomeComponent";
import { Button, Card } from "@tremor/react";
import Header from "../components/Header";
import Lists from "../components/Lists";

export default function HomePage(): JSX.Element {
  return (
    <div>
      <Header />
      <Benefits />
      <PanelHome />
      <Lists />
      <Outlet />
    </div>
  );
}
