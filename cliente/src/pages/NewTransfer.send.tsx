import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import HeaderBackButton from "@/components/HeaderBackButton";
import Buttonc from "@/components/Buttonc";

import { CashIcon } from "@heroicons/react/outline";

import { useNewTranferData } from "@/context/NewTransferContext";
import { useUserData } from "@/context/UserContext";

import apiTransactions from "@/services/transactions";

function TransferMoney() {
  const navigate = useNavigate();
  const { user } = useUserData();

  const { transferData, setTransferData } = useNewTranferData();

  const newTransferHandler = async () => {
    try {
      const payload = {
        ...transferData,
        status:"succes",
        sender: user?.id,
        receiver: transferData?.receiver?.id,
      };
      console.log(payload);
      const response = await apiTransactions.transferFunds(payload);
      console.log(response);
      setTransferData({
        amount: 0,
        sender: null,
        receiver: null,
        reference: null,
      });
      toast.success("Transferencia Exitosa");
      navigate("/response", {
        state: { msg: "Tu transferencia se realizó con éxito" },
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Error en transferencia");
    }
  };

  return (
    <>
      <HeaderBackButton title="Transferencia" />
      <h1 className="flex justify-center mt-8 text-black text-2xl font-bold">
        ${transferData?.amount?.toLocaleString()}
      </h1>
      <div className="mx-4 mt-14 mb-20 flex flex-col gap-2 ">
        <div className="flex items-center gap-2 border-b-2 py-3">
          <h2 className="text-sm">Enviar a : </h2>
          <img
            src={transferData?.receiver?.avatar}
            className="w-8 h-8 rounded-full  object-cover"
          />
          {transferData?.receiver?.firstName}
          {transferData?.receiver?.lastName}
        </div>
        {/*    <h2 className="border-b-2 pb-2.5 text-sm">
          cbu: {transferData?.receiver?.id}
        </h2> */}
        <h3 className="border-b-2 pb-2.5 mt-5 text-sm">
          Fecha:{" "}
          {new Date().toLocaleDateString("default", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>
        <h3 className="border-b-2 pb-2.5 mt-5 text-sm">
          Motivo: {transferData?.reference}
        </h3>
        {/*  <h4 className="mt-5 text-sm">pagos con: Itau Debito</h4> */}
        <div className="rounded bg-primary-50 p-6 flex flex-col justify-center items-center gap-4 my-3">
          <p className="text-sm self-start">
            <CashIcon className="h-5 w-5 inline mr-3 text-primary " />
            Pagarás con tu saldo de Pigmeo
          </p>
          <p className="text-sm">Disponible</p>
          <p className="text-sm font-bold">
            ${user?.balance?.toLocaleString()}
          </p>
        </div>

        <button
          className="mt-5 bg-primary text-white px-5 py-3 rounded-2xl w-full"
          onClick={newTransferHandler}
        >
          Continuar
        </button>
        <Buttonc styled={false} href="/home">
          Cancelar
        </Buttonc>
      </div>
      {/* <Buttonc styled={true} action="transferir" href="/response">
        Transferir
      </Buttonc> */}
    </>
  );
}

export default TransferMoney;
