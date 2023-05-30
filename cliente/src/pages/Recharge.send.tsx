import HeaderBackButton from "@/components/HeaderBackButton"
import { Card, Text } from "@tremor/react";
import TransferButton from "@/components/Buttonc"
import sube from "../assets/sube.png"; 

function RechargeSend(){
return(
    <>
    <HeaderBackButton title="Transferencia" />
    <div className="flex justify-center my-14">
        <img className="w-20  h-10" src={sube} alt="sube" />
      </div>
    <h1 className="flex flex justify-center mt-8 text-black text-2xl">$1200</h1>
    <div className="mx-4 mt-14 mb-20">
    <h2 className="border-b-2 pb-2.5 text-sm">Enviar a cbu:123456789</h2>
    <h3 className="border-b-2 pb-2.5 mt-5 text-sm">Fecha: 10/05/2023</h3>
    <h4 className="mt-5 text-sm">pagos con: Itau Debito</h4>
    </div>
    <TransferButton children="Recargar" styled={true} action=""/>
    <TransferButton children="Cancelar" styled={false} action=""/>

    </>
)
}

export default RechargeSend
