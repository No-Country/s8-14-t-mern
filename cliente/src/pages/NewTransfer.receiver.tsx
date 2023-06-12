import { ReactElement, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Subtitle, Text, Title } from "@tremor/react";

import { useNewTranferData } from "@/context/NewTransferContext";
import { useUserData } from "@/context/UserContext";

import HeaderBackButton from "@/components/HeaderBackButton";
import Buttonc from "@/components/Buttonc";

import apiTransactions from "@/services/transactions";
import apiUsers from "@/services/users";

function NewTransfer(): ReactElement {
  const { transferData, setTransferData } = useNewTranferData();
  const { user } = useUserData();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiUsers.getUsers();
        console.log(data);
        setContacts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    console.log("submit");
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const alias = formData.get("alias") as string;
    if (alias === user?.id) {
      toast.error("ingresa un alias diferente");
      return;
    }
    verifyAlias(alias);
  };

  const verifyAlias = async (alias: string) => {
    try {
      console.log(alias);
      const response = await apiTransactions.verifyAlias(alias);
      const receiver = response?.data?.data;
      console.log(response);
      setTransferData((prev) => ({ ...prev, receiver }));
      navigate("/newTransfer/amount");
    } catch (error: any) {
      console.log(error);
      //toast.error(error?.response?.data?.error || "Error al buscar cbu");
      toast.error("Alias Incorrecto");
    }
  };

  return (
    <>
      <HeaderBackButton title="Transferencia" />
      <form onSubmit={submitHandler} className="flex flex-col p-5 gap-7">
        <Title>¿A quién deseas enviarle dinero?</Title>
        <div className=" w-full">
          <Text>Ingresá el Alias</Text>

          <input
            name="alias"
            defaultValue={transferData?.receiver?.alias}
            className="mt-1 border border-gray-300 rounded-lg  
             outline-0 focus:ring-2 ring-primary w-full p-2.5"
            placeholder="Alias"
            required
          />
        </div>
        <Subtitle className="text-black">O elige entre tus contactos</Subtitle>
        <div className="flex gap-5 flex-wrap">
          {contacts.slice(0, 7).map((contact: any, i) => (
            <button
              key={i}
              type="button"
              className="flex flex-col items-center gap-1 text-xs"
              onClick={() => verifyAlias(contact?.alias)}
            >
              <img
                src={contact?.avatar}
                className="w-10 h-10 rounded-full  object-cover"
              />
              {contact?.firstName}&nbsp;
              {contact?.lastname}
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
