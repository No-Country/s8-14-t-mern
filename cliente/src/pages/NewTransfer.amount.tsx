import { ReactElement } from "react";

import { Button, Subtitle, Text, Title, TextInput, Flex } from "@tremor/react";

import HeaderBackButton from "@/components/HeaderBackButton";

function NewTransfer(): ReactElement {
  return (
    <>
      <HeaderBackButton title="Transferencia" />
      <Flex
        className="p-5 gap-7 h-[calc(100vh-44px)]"
        flexDirection="col"
        alignItems="start"
      >
        <Title>Ingresá la cifra que deseas transeferir</Title>
        <div className="w-full flex-grow flex flex-col justify-center items-center  ">
          <input
            defaultValue="0,000"
            placeholder="Monto"
            className="text-center border-b-2 py-5 mb-5 text-2xl font-bold"
          />
          <Text>Mínimo $20</Text>
        </div>
      </Flex>
    </>
  );
}

export default NewTransfer;
