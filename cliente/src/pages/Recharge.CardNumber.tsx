import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "@/context/UserContext";
import { RechargeCardNumber } from "@/services/Recharges";
import HeaderBackButton from "@/components/HeaderBackButton";
import { Card, Text, Metric } from "@tremor/react";
import Buttonc from "@/components/Buttonc";
import moneylogo from "../assets/moneyLogo.png";
import { RechargeContext } from "@/context/RechargeContext";
import toast from "react-hot-toast";


function Inputs({ handleNumberChange }: {handleNumberChange: any}) {
  const { user } = useUserData();

  return (
    <div className="flex flex-col items-center max-w-full h-full">
      <label htmlFor="Numero de tarjeta" className="mb-2 text-black">
        Número de tarjeta
      </label>
      <input
        type="number"
        className="outline-0 focus:border-[#3B1B80] border-2 border-[#9BA4B4] h-14 rounded-lg w-11/12"
        onChange={handleNumberChange}
      />
      <Card className="bg-[#F5F2FF] mt-6 w-[90%] flex flex-col items-center gap-3 mb-4">
        <div className="flex flex-row w-full">
          <img className="mr-4 " src={moneylogo} alt="moneylogo" />
          <Text className="text-sm  font-normal">
            Pagarás con tu saldo de Pigmeo
          </Text>
        </div>
        <Text className="text-black">Disponible</Text>
        <Metric>${user?.balance}</Metric>
      </Card>
    </div>
  );
}

function RechargeCardNumberComponent() {
  const { user } = useUserData();
  const [number, setNumberCard] = useState("");
  const { cardId, setRechargeId, selectedImage, setCatchNumberCard } = useContext(RechargeContext);
  const navigate = useNavigate();

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberCard(event.target.value);
  };

  const handleRechargeCardNumber = () => {
    RechargeCardNumber({
      cardOptions: cardId || "",
      numberCard: parseInt(number),
      userId: user?.id || "",
    })
      .then((response) => {
        setCatchNumberCard(response.data.numberCard)
        setRechargeId(response.data.id)
        navigate("/Recharge/amount");
      })
      .catch((error) => {
        toast.error(error.response.data.error || "Error en la recarga");
      });
  };


  return (
    <>
      <HeaderBackButton title="Recargas" />
      <div className="flex justify-center my-14 ">
        <img
          className="w-20 h-10"
          src={selectedImage || ""}
          alt="selected Image"
        />
      </div>
      <Inputs handleNumberChange={handleNumberChange} />
      <div className="flex justify-center">
        <button
          className="bg-primary text-white w-11/12 rounded-md h-12"
          onClick={handleRechargeCardNumber}
        >
          Continuar
        </button>
      </div>

      <Buttonc styled={false} href="/home">
        Cancelar
      </Buttonc>
    </>
  );
}

export default RechargeCardNumberComponent;
