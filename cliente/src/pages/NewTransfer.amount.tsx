import { ReactElement, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Subtitle, Text, Title, TextInput, Flex } from "@tremor/react";

import HeaderBackButton from "@/components/HeaderBackButton";
import Buttonc from "@/components/Buttonc";

import { useNewTranferData } from "@/context/NewTransferContext";

function NewTransfer(): ReactElement {
  const navigate = useNavigate();
  const { transferData, setTransferData } = useNewTranferData();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const amount = formData.get("amount") as string;
    setTransferData((prev) => ({ ...prev, amount: +amount }));
    navigate("/newTransfer/category");
  };

  return (
    <>
      <HeaderBackButton title="Transferencia" />
      <form
        className="p-5 gap-7 h-[calc(100vh-250px)] flex flex-col items-center"
        onSubmit={submitHandler}
      >
        <Title className="text-black">
          Ingresá la cifra que deseas transeferir
        </Title>
        <img
          src={transferData?.receiver?.avatar}
          className="w-16 h-16 rounded-full col-start-2"
        />
        <div className="w-full flex-grow flex flex-col justify-center items-center  ">
          <input
            required
            type="number"
            name="amount"
            defaultValue={transferData?.amount}
            min="20"
            placeholder="Monto"
            className="text-center border-b-2 border-primary  py-5 mb-5 text-2xl font-bold
            outline-0 focus:ring ring-primary-50 "
          />
          <Text>Mínimo $20</Text>
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-5 py-3 rounded-2xl w-full"
        >
          Continuar
        </button>
      </form>
      {/*       <Buttonc styled={true} action="continuar" href="/newTransfer/category">
        Continuar
      </Buttonc> */}
      <Buttonc styled={false} href="/home">
        Cancelar
      </Buttonc>
    </>
  );
}

export default NewTransfer;
