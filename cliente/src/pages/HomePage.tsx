import { useEffect } from "react";

import Benefits from "@/components/BenefitHomeComponent";
import PanelHome from "@/components/PanelHomeComponent";
import Header from "../components/Header";
import Lists from "../components/Lists";
import Popup from "@/components/Popup";

import { useUserData } from "@/context/UserContext";

export default function HomePage(): JSX.Element {
  const { fetchUserData } = useUserData();

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Header />
      <PanelHome />
      <Benefits />
      <Lists />
    </>
  );
}
