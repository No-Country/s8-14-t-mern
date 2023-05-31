import { ReactElement, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Subtitle, Text, Title } from "@tremor/react";

import { useNewTranferData } from "@/context/NewTransferContext";
import { useUserData } from "@/context/UserContext";

import HeaderBackButton from "@/components/HeaderBackButton";
import Buttonc from "@/components/Buttonc";

import apiTransactions from "@/services/transactions";

const contacts: { name: string }[] = [
  { name: "Raúl Perez" },
  { name: "Micaela Gómez" },
  { name: "Mariana Gómez" },
  { name: "Ale Paz" },
];

function NewTransfer(): ReactElement {
  const { transferData, setTransferData } = useNewTranferData();
  const { user } = useUserData();
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const cbu = formData.get("cbu") as string;
    if (cbu === user?.id) {
      toast.error("ingresa un cbu diferente");
      return;
    }
    try {
      const response = await apiTransactions.verifyCBU(cbu);
      const receiver = response?.data?.data;
      console.log(response);
      setTransferData((prev) => ({ ...prev, receiver }));
      navigate("/newTransfer/amount");
    } catch (error: any) {
      console.log(error);
      //toast.error(error?.response?.data?.error || "Error al buscar cbu");
      toast.error("cbu Incorrecto");
    }
  };

  return (
    <>
      <HeaderBackButton title="Transferencia" />
      <form onSubmit={submitHandler} className="flex flex-col p-5 gap-7">
        <Title>¿A quién deseas enviarle dinero?</Title>
        <div className=" w-full">
          <Text>Ingresá el CBU</Text>

          <input
            name="cbu"
            defaultValue={transferData?.receiver?.id}
            className="mt-1 border border-gray-300 rounded-lg  
             outline-0 focus:ring-2 ring-primary w-full p-2.5"
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
        <button
          type="submit"
          className="bg-primary text-white px-5 py-3 rounded-2xl w-full"
        >
          Continuar
        </button>
        {/*  <Buttonc styled={true} action="continuar" href="/newTransfer/amount">
          Continuar
        </Buttonc> */}
        <Buttonc styled={false} href="/home">
          Cancelar
        </Buttonc>
      </form>
    </>
  );
}

export default NewTransfer;
