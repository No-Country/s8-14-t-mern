import React, { useState } from "react";
import HeaderBackButton from "@/components/HeaderBackButton";
import { Card, Text } from "@tremor/react";
import sube from "../assets/sube.png";
import saeta from "../assets/saeta.png";
import redbus from "../assets/RedBus.png";
import claro from "../assets/claro-logo.png";
import personal from "../assets/Personal_logo.png";
import movistar from "../assets/movistar.png";
import tuenti from "../assets/tuentii 1.png";

interface Props {
  img: string;
  text: string;
}
const Cards: React.FC<Props> = ({ img, text }) => (
  <Card className="w-5/6 p-0 h-52 cursor-pointer">
    <div className="flex justify-center items-center bg-[#F5F2FF] h-3/4">
      <img className="w-16" src={img} alt="sube" />
    </div>
    <Text className="text-center mt-3">{text}</Text>
  </Card>
);
const TransportContent: React.FC = () => (
  <div className="grid grid-cols-2 place-items-center gap-y-10 mt-10">
    <Cards img={sube} text="Sube" />
    <Cards img={saeta} text="Saeta" />
    <Cards img={redbus} text="Red bus Cordoba" />
  </div>
);

const PhoneContent: React.FC = () => (
  <div className="grid grid-cols-2 place-items-center gap-y-10 mt-10">
    <Cards img={claro} text="claro" />
    <Cards img={personal} text="Personal" />
    <Cards img={movistar} text="Movistar" />
    <Cards img={tuenti} text="Tuenti" />
  </div>
);

const Recharge: React.FC = () => {
  const [showTransportContent, setShowTransportContent] =
    useState<boolean>(true);
  const [showPhoneContent, setShowPhoneContent] = useState<boolean>(false);

  const toggleTransportContent = (): void => {
    setShowTransportContent(true);
    setShowPhoneContent(false);
  };

  const togglePhoneContent = (): void => {
    setShowPhoneContent(true);
    setShowTransportContent(false);
  };

  return (
    <>
      <HeaderBackButton title="Recargas" />
      <div className="flex justify-center">
        <div className="flex flex-row justify-between w-52 mt-5">
          <h1
            onClick={toggleTransportContent}
            className={`w-full text-center cursor-pointer pb-2  ${
              showTransportContent
                ? " text-[#3B1B80] border-b-2 border-[#08258C]"
                : "border-b-2 text-gray-500"
            }`}
          >
            Transporte
          </h1>
          <h2
            onClick={togglePhoneContent}
            className={`w-full text-center cursor-pointer ${
              showPhoneContent
                ? "text-[#3B1B80] border-b-2 border-[#08258C]"
                : "border-b-2 text-gray-500"
            }`}
          >
            Celular
          </h2>
        </div>
      </div>
      {showTransportContent && <TransportContent />}
      {showPhoneContent && <PhoneContent />}
    </>
  );
};

export default Recharge;
