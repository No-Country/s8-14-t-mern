import HeaderBackButton from "@/components/HeaderBackButton";
import { Card, Text, Metric } from "@tremor/react";
import Buttonc from "@/components/Buttonc";
import sube from "../assets/sube.png";
import moneylogo from "../assets/moneyLogo.png";

const Inputs: React.FC = () => (
  <div className="flex flex-col w-full mt-7 ml-7 mb-32">
    <label htmlFor="Numero de tarjeta" className="mb-2 text-black">
      Número de tarjeta
    </label>
    <input
      type="number"
      className="outline-0 focus:border-[#3B1B80] border-2 border-[#9BA4B4]  h-14 rounded-lg w-11/12"
    />
    <Card className="bg-[#F5F2FF] mt-6 w-11/12 flex flex-col items-center">
      <div className="flex flex-row mr-16 ">
        <img className="mr-5" src={moneylogo} alt="moneylogo" />
        <Text className="text-sm mb-4 font-normal">
          Pagaras con tu saldo de Pigmeo
        </Text>
      </div>
      <Text className="text-black">Disponible</Text>
      <Metric>$1828</Metric>
    </Card>
  </div>
);
function RechargeCardNumber() {
  return (
    <>
      <HeaderBackButton title="Recargas" />
      <div className="flex justify-center my-24">
        <img className="w-20  h-10" src={sube} alt="sube" />
      </div>
      <Inputs />
      <Buttonc styled={true} action="continuar" href="/recharge/amount">
        Continuar
      </Buttonc>
      <Buttonc styled={false} href="/home">
        Cancelar
      </Buttonc>
    </>
  );
}

export default RechargeCardNumber;
