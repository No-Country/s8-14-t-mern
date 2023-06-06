import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import HeaderBackButton from "@/components/HeaderBackButton";
import Buttonc from "@/components/Buttonc";

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
        state: { msg: "Tu envío se realizó con éxito" },
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
      <div className="mx-4 mt-14 mb-20 flex flex-col gap-2">
        <h2 className="border-b-2 pb-2.5 text-sm">
          Enviar a cbu: {transferData?.receiver?.id}
        </h2>
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
        <h4 className="mt-5 text-sm">pagos con: Itau Debito</h4>
        <button
          className="mt-5 bg-primary text-white px-5 py-3 rounded-2xl w-full"
          onClick={newTransferHandler}
        >
          Continuar
        </button>
      </div>
      {/* <Buttonc styled={true} action="transferir" href="/response">
        Transferir
      </Buttonc> */}
      <Buttonc styled={false} href="/home">
        Cancelar
      </Buttonc>
    </>
  );
}

export default TransferMoney;
