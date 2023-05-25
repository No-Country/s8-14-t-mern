import React, { useState } from "react";
import HeaderBackButton from "@/components/HeaderBackButton";
import { Card, Text } from "@tremor/react";
interface Props {
  img: string;
  text: string;
}
const Cards: React.FC<Props> = ({ img, text }) => (
  <Card className="w-5/6 p-0 h-60 cursor-pointer">
    <img className="w-full h-48" src={img} alt="sube" />
    <Text className="text-center mt-3">{text}</Text>
  </Card>
);
const TransportContent: React.FC = () => (
  <div className="grid grid-cols-2 place-items-center gap-y-10 mt-10">
    <Cards
      img="https://th.bing.com/th/id/OIP._f8gBwZZdVItfTCcskILqQHaFD?pid=ImgDet&rs=1"
      text="Sube"
    />
    <Cards
      img="https://th.bing.com/th/id/OIP._f8gBwZZdVItfTCcskILqQHaFD?pid=ImgDet&rs=1"
      text="Saeta"
    />
    <Cards
      img="https://th.bing.com/th/id/OIP._f8gBwZZdVItfTCcskILqQHaFD?pid=ImgDet&rs=1"
      text="Red bus Cordoba"
    />
  </div>
);

const PhoneContent: React.FC = () => (
  <div className="grid grid-cols-2 place-items-center gap-y-10 mt-10">
    <Cards
      img="https://th.bing.com/th/id/OIP._f8gBwZZdVItfTCcskILqQHaFD?pid=ImgDet&rs=1"
      text="Movistar"
    />
    <Cards
      img="https://th.bing.com/th/id/OIP._f8gBwZZdVItfTCcskILqQHaFD?pid=ImgDet&rs=1"
      text="Personal"
    />
    <Cards
      img="https://th.bing.com/th/id/OIP._f8gBwZZdVItfTCcskILqQHaFD?pid=ImgDet&rs=1"
      text="Claro"
    />
    <Cards
      img="https://th.bing.com/th/id/OIP._f8gBwZZdVItfTCcskILqQHaFD?pid=ImgDet&rs=1"
      text="Tuenti"
    />
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
        <div className="flex flex-row justify-between w-52 mt-5 ">
          <h1
            onClick={toggleTransportContent}
            className={`w-full text-center cursor-pointer ${
              showTransportContent ? "border-b-4 border-black" : "border-b-2"
            }`}
          >
            Transporte
          </h1>
          <h2
            onClick={togglePhoneContent}
            className={`w-full text-center cursor-pointer ${
              showPhoneContent ? "border-b-4 border-black" : "border-b-2"
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
