import HeaderBackButton from "@/components/HeaderBackButton";
import TransferButton from "@/components/Buttonc";
import { RechargeContext } from "@/context/RechargeContext";
import { useContext } from "react";


function RechargeSend() {
  const { selectedImage, selectName, amountUser, catchNumberCard } = useContext(RechargeContext)


  return (
    <>
      <HeaderBackButton title="Transferencia" />
      <div className="flex justify-center my-14">
        <img className="w-20  h-10" src={selectedImage || ""} alt="sube" />
      </div>
      <h1 className="flex flex justify-center mt-8 text-black text-2xl">
        {amountUser}
      </h1>
      <div className="mx-4 mt-14 mb-20">
        <h2 className="border-b-2 pb-2.5 text-sm">Numero de Tarjeta {selectName + ":" + " " + catchNumberCard} </h2>
        <h3 className="border-b-2 pb-2.5 mt-5 text-sm">
          Fecha:{" "}
          {new Date().toLocaleDateString("default", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>
        <h4 className="mt-5 text-sm">pagas con tu saldo pigmeo</h4>
      </div>
      <TransferButton children="Recargar" styled={true} action="recargar" />
      <TransferButton children="Cancelar" styled={false} action="volver" href="/" />
    </>
  );
}

export default RechargeSend;
