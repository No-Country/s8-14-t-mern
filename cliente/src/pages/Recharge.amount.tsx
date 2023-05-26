import HeaderBackButton from "@/components/HeaderBackButton";
import { Card, Text } from "@tremor/react";
import Buttonc from "@/components/Buttonc";

const Inputs: React.FC = () => (
  <div className="flex flex-col w-60 mt-7 ml-7 mb-32">
    <label htmlFor="Numero de tarjeta" className="mb-2">
      Número de tarjeta
    </label>
    <input type="number" className="outline-none bg-[#CBC3C3] h-14 rounded-lg" />
    <label htmlFor="Importe a recargar" className="mt-6 mb-2">
      Importe a recargar
    </label>
    <input type="number" className="outline-none bg-[#CBC3C3] h-14 rounded-lg" />
    <Card className="bg-[#CBC3C3] mt-6">
      <Text className="text-black mb-4">Con tu saldo de Pigemo</Text>
      <Text className="w-28 text-red-500 border-b-2 border-red-500 text-sm">
        Saldo insuficiente
      </Text>
    </Card>
  </div>
);
function RechargeAmount() {
  return (
    <>
      <HeaderBackButton title="Recargas" />
      <Card className="bg-[#CBC3C3] mt-3">
        <Text className="text-center text-lg text-black">SUBE</Text>
      </Card>
      <Inputs />
      <Buttonc children="Continuar" styled={true} action="" />
      <Buttonc children="Cancelar" styled={false} action="" />
    </>
  );
}

export default RechargeAmount;
