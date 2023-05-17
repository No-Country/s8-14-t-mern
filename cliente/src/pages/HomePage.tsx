import { Outlet } from "react-router-dom";
import Benefits from "@/components/BenefitHomeComponent";
import PanelHome from "@/components/PanelHomeComponent";
import { Button, Card } from "@tremor/react";
export default function HomePage(): JSX.Element {
  return (
    <div>
      <Benefits />
      <PanelHome />
      <Outlet />
    </div>
  );
}
