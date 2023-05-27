import { ReactElement } from "react";

import { Button, Subtitle, Text, Title, TextInput, Flex } from "@tremor/react";

import HeaderBackButton from "@/components/HeaderBackButton";
import Buttonc from "@/components/Buttonc";

function NewTransfer(): ReactElement {
  return (
    <>
      <HeaderBackButton title="Transferencia" />
      <Flex
        className="p-5 gap-7 h-[calc(100vh-250px)]"
        flexDirection="col"
        alignItems="center" 
      >
        <Title className="text-black">Ingresá la cifra que deseas transeferir</Title>
        <img
          src={`https://picsum.photos/seed/200/300`}
          className="w-16 h-16 rounded-full col-start-2"
        />
        <div className="w-full flex-grow flex flex-col justify-center items-center  ">
          <input
            defaultValue="0,000"
            placeholder="Monto"
            className="text-center border-b-2 border-primary  py-5 mb-5 text-2xl font-bold
            outline-0 focus:ring ring-primary-50 "
          />
          <Text>Mínimo $20</Text>
        </div>
      </Flex>
      <Buttonc styled={true} action="continuar" href="/newTransfer/category">
        Continuar
      </Buttonc>
      <Buttonc styled={false} href="/home">
        Cancelar
      </Buttonc>
    </>
  );
}

export default NewTransfer;
