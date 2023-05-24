import Benefits from "@/components/BenefitHomeComponent";
import PanelHome from "@/components/PanelHomeComponent";
import Header from "../components/Header";
import Lists from "../components/Lists";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Header />
      <PanelHome />
      <Benefits />
      <Lists />
    </>
  );
}
