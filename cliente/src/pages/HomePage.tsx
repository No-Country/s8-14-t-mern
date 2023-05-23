import { Outlet } from "react-router-dom";
import Benefits from "@/components/BenefitHomeComponent";
import PanelHome from "@/components/PanelHomeComponent";
import Header from "../components/Header";
import Lists from "../components/Lists";
import Popup from "@/components/Popup";

export default function HomePage(): JSX.Element {
  return (
    <div>
      <Header />
      <Benefits />
      <PanelHome />
      <Lists />
      <Outlet />
      <Popup/>
    </div>
  );
}
