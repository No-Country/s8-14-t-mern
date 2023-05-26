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
          <TextInput placeholder="CBU" />
        </div>
        <Subtitle className="text-black">O elige entre tus contactos</Subtitle>
        <ul className="w-full flex flex-col gap-3">
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
        </ul>
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
