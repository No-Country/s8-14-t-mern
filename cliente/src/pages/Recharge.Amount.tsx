import { ReactElement } from "react";

import { Text, Flex } from "@tremor/react";

import HeaderBackButton from "@/components/HeaderBackButton";
import Buttonc from "@/components/Buttonc";
import sube from "../assets/sube.png";

function RechargeAmount(): ReactElement {
  return (
    <>
      <HeaderBackButton title="Recargas" />
      <Flex
        className="p-5 gap-7 h-[calc(100vh-250px)] mt-[6.75rem]"
        flexDirection="col"
        alignItems="center"
      >
          <img src={sube} className="w-20 h-10 rounded-full col-start-2" />
        <div className="w-full flex-grow flex flex-col justify-center items-center ">
          <input
            defaultValue="0,000"
            placeholder="Monto"
            className="text-center border-b-2 border-primary  py-5 mb-5 text-2xl font-bold
            outline-0 focus:ring ring-primary-50 "
          />
          <Text>Mínimo $20</Text>
        </div>
      </Flex>
      <Buttonc styled={true} action="continuar" href="/recharge/send">
        Continuar
      </Buttonc>
      <Buttonc styled={false} href="/home">
        Cancelar
      </Buttonc>
    </>
  );
}

export default RechargeAmount;
