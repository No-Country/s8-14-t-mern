import React, { useContext, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useUserData } from '@/context/UserContext';
import { RechargeCardNumber } from '@/services/Recharges';
import HeaderBackButton from '@/components/HeaderBackButton';
import { Card, Text, Metric } from '@tremor/react';
import Buttonc from '@/components/Buttonc';
import moneylogo from '../assets/moneyLogo.png';
import { RechargeContext } from '@/context/RechargeContext';

function Inputs({ handleNumberChange }) {
  const { user } = useUserData();

  return (
    <div className="flex flex-col w-full mt-7 ml-7 mb-32">
      <label htmlFor="Numero de tarjeta" className="mb-2 text-black">
        Número de tarjeta
      </label>
      <input
        type="number"
        className="outline-0 focus:border-[#3B1B80] border-2 border-[#9BA4B4] h-14 rounded-lg w-11/12"
        onChange={handleNumberChange}
      />
      <Card className="bg-[#F5F2FF] mt-6 w-11/12 flex flex-col items-center">
        <div className="flex flex-row mr-16">
          <img className="mr-5" src={moneylogo} alt="moneylogo" />
          <Text className="text-sm mb-4 font-normal">
            Pagaras con tu saldo de Pigmeo
          </Text>
        </div>
        <Text className="text-black">Disponible</Text>
        <Metric>{user?.balance}</Metric>
      </Card>
    </div>
  );
}

function RechargeCardNumberComponent() {
  const { imageUrl } = useParams<{ imageUrl?: string }>();
  const { user } = useUserData();
  const [number, setNumberCard] = useState("");
  const { cardId } = useContext(RechargeContext);
  const navigate = useNavigate()

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberCard(event.target.value);
  };

  const handleRechargeCardNumber = () => {
    RechargeCardNumber({
      cardOptions: cardId || '',
      numberCard: parseInt(number),
      userId: user?.id || '',
    })
      .then((response) => {
        navigate("/Recharge/amount")
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (!imageUrl) {
    return <div>No image selected</div>;
  }

  return (
    <>
      <HeaderBackButton title="Recargas" />
      <div className="flex justify-center my-24 ">
        <img className="w-20 h-10" src={decodeURIComponent(imageUrl)} alt="sube" />
      </div>
      <Inputs handleNumberChange={handleNumberChange} />
      <div className="flex justify-center">
      <button className="bg-primary text-white w-11/12 rounded-md h-12"onClick={handleRechargeCardNumber}>
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


