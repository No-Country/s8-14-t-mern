import HeaderBackButton from "@/components/HeaderBackButton"
import Buttonc from "@/components/Buttonc"

function TransferMoney() {
    return (
        <>
            <HeaderBackButton title="Transferencia" />
            <h1 className="flex justify-center mt-8 text-black text-2xl">$1200</h1>
            <div className="mx-4 mt-14 mb-20">
                <h2 className="border-b-2 pb-2.5 text-sm">Enviar a cbu:123456789</h2>
                <h3 className="border-b-2 pb-2.5 mt-5 text-sm">Fecha: 10/05/2023</h3>
                <h4 className="mt-5 text-sm">pagos con: Itau Debito</h4>
            </div>
            <Buttonc styled={true} action="transferir" href="/response">
                Transferir
            </Buttonc>
            <Buttonc styled={false} href="/home">
                Cancelar
            </Buttonc>

        </>
    )
}

export default TransferMoney
