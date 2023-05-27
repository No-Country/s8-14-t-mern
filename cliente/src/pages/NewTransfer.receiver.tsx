import { ReactElement } from "react";

import { Subtitle, Text, Title, TextInput, Flex } from "@tremor/react";

import HeaderBackButton from "@/components/HeaderBackButton";
import Buttonc from "@/components/Buttonc";

const contacts: { name: string }[] = [
  { name: "Raúl Perez" },
  { name: "Micaela Gómez" },
  { name: "Mariana Gómez" },
  { name: "Ale Paz" },
];

function NewTransfer(): ReactElement {
  return (
    <>
      <HeaderBackButton title="Transferencia" />
      <Flex className="p-5 gap-7" flexDirection="col" alignItems="start">
        <Title>¿A quién deseas enviarle dinero?</Title>
        <div className=" w-full">
          <Text>Ingresá el CBU</Text>

          <input
            className="mt-1 border border-gray-300 rounded-lg  
             outline-0 focus:ring ring-primary-200 w-full p-2.5"
            placeholder="CBU"
            required
          />
        </div>
        <Subtitle className="text-black">O elige entre tus contactos</Subtitle>
        <div className="flex gap-5 flex-wrap">
          {contacts.map((contact, i) => (
            <button
              key={i}
              className="flex flex-col items-center gap-1 text-sm"
            >
              <img
                src={`https://picsum.photos/seed/${i + 1}/200/300`}
                className="w-12 h-12 rounded-full col-start-2"
              />
              {contact.name}
            </button>
          ))}
        </div>
        {/*  <ul className="w-full flex flex-col gap-3">
          {contacts.map((contact, i) => (
            <li className="" key={i}>
              <button className="rounded bg-[#E3DADA] w-full flex items-center gap-5">
                <img
                  src={`https://picsum.photos/seed/${i + 1}/200/300`}
                  className="w-14 h-14 rounded col-start-2"
                />
                {contact.name}
              </button>
            </li>
          ))}
        </ul> */}
      </Flex>
      <Buttonc styled={true} action="continuar" href="/newTransfer/amount">
        Continuar
      </Buttonc>
      <Buttonc styled={false} href="/home">
        Cancerl
      </Buttonc>
    </>
  );
}

export default NewTransfer;
