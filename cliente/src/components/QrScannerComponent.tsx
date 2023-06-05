import { UserAccount } from '@/types';
import apiTransactions from "@/services/transactions";
import { useNewTranferData } from '@/context/NewTransferContext';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { QrScanner } from '@yudiel/react-qr-scanner';
import HeaderBackButton from './HeaderBackButton';

export default function QrScannerComponent() {
  const { setTransferData } = useNewTranferData();
  const navigate = useNavigate()
  const codeSucces = async (result: string) => {
    const res: UserAccount = JSON.parse(result)
    try {
      const response = await apiTransactions.verifyCBU(res.id);
      const receiver = response?.data?.data;
      setTransferData((prev) => ({ ...prev, receiver }));
      navigate("/newTransfer/amount");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Error al buscar cbu");
      toast.error("cbu Incorrecto");
    }
  }
  const codeError = (error: Error) => {
    console.log(error.message)
  }
  return (
    <>
      <QrScanner
        onDecode={(result) => codeSucces(result)}
        onError={(error) => codeError(error)}
        containerStyle={{ height: "100%", padding: 0, margin: "auto" }}
        videoStyle={{ maxWidth: "none", width: "auto", zIndex: -1 }}
        viewFinder={() =>
          <>
            <HeaderBackButton title='Escaneá el código QR para pagar' />
          </>
        }
      />

    </>
  )
}