import React, { useState, useEffect, useContext } from "react";
import HeaderBackButton from "@/components/HeaderBackButton";
import { Link } from "react-router-dom";
import { Card, Text } from "@tremor/react";
import { getCards } from "@/services/Recharges";
import { RechargeContext } from "@/context/RechargeContext";

const Cards: React.FC<{ cards: any[] }> = ({ cards }) => {
  const { handleCardClick } = useContext(RechargeContext);

  return (
    <div className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <Link
            to={"/Recharge/cardnumber"}
            key={card.id}
          >
            <Card
              className="w-36 p-0 h-36"
              onClick={() => handleCardClick(card.id, card.image, card.name)}
            >
              <div className="flex justify-center items-center bg-[#F5F2FF] h-3/4">
                <img className="w-16" src={card.image} alt="images" />
              </div>
              <Text className="text-center mt-3">{card.name}</Text>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Recharge: React.FC = () => {
  const [cards, setCards] = useState([]);
  const [transportCards, setTransportCards] = useState([]);
  const [phoneCards, setPhoneCards] = useState([]);
  const [activeSection, setActiveSection] = useState<"transport" | "phone">(
    "transport"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all cards
        const response = await getCards({
          cardType: "",
        });
        setCards(response.data);

        const transportCardsData = response.data.filter(
          (card: any) => card.cardType === "transport"
        );
        setTransportCards(transportCardsData);

        const phoneCardsData = response.data.filter(
          (card: any) => card.cardType === "cell phone"
        );
        setPhoneCards(phoneCardsData);
      } catch (error) {
        console.log("Error fetching cards:", error);
      }
    };

    fetchData();
  }, []);

  const toggleTransportContent = (): void => {
    setActiveSection("transport");
  };

  const togglePhoneContent = (): void => {
    setActiveSection("phone");
  };

  return (
    <>
      <HeaderBackButton title="Recargas" />
      <div className="flex justify-center">
        <div className="flex flex-row justify-between w-52 mt-5">
          <h1
            onClick={toggleTransportContent}
            className={`w-full text-center cursor-pointer pb-2  ${activeSection === "transport"
                ? " text-[#3B1B80] border-b-2 border-[#08258C]"
                : "border-b-2 text-gray-500"
              }`}
          >
            Transporte
          </h1>
          <h2
            onClick={togglePhoneContent}
            className={`w-full text-center cursor-pointer ${activeSection === "phone"
                ? "text-[#3B1B80] border-b-2 border-[#08258C]"
                : "border-b-2 text-gray-500"
              }`}
          >
            Celular
          </h2>
        </div>
      </div>
      {activeSection === "transport" && (
        <div className="w-full flex justify-center">
          <div className="gap-y-7 gap-x-5 mt-10">
            <Cards cards={transportCards} />
          </div>
        </div>
      )}
      {activeSection === "phone" && (
        <div className="w-full flex justify-center">
          <div className="gap-y-5 gap-x-7 mt-10">
            <Cards cards={phoneCards} />
          </div>
        </div>
      )}
    </>
  );
};

export default Recharge;
