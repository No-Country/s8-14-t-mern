import { UserAccount } from '@/types';
import apiTransactions from "@/services/transactions";
import { useNewTranferData } from '@/context/NewTransferContext';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { QrScanner } from '@yudiel/react-qr-scanner';
import HeaderBackButton from './HeaderBackButton';
import { QrcodeIcon } from '@heroicons/react/outline';
import { useState } from 'react';

export default function QrScannerComponent({ setScannerOpen }: { setScannerOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [onErrorDevice, setOnErrorDevice] = useState(false)
  const { setTransferData } = useNewTranferData();
  const navigate = useNavigate()
  const codeSucces = async (result: string) => {
    const res: UserAccount = JSON.parse(result)
    try {
      const response = await apiTransactions.verifyAlias(res.alias);
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
    error.message.includes("Requested device not found") && setOnErrorDevice(true)
    // console.log(error.message)
    // console.log(error)
  }
  return (
    <>
      <QrScanner
        onDecode={(result) => codeSucces(result)}
        scanDelay={3000}
        onError={(error) => codeError(error)}
        containerStyle={{ padding: 0, margin: "auto", height: "100vh" }}
        videoStyle={{ maxWidth: "none", width: "auto", zIndex: -1 }}
        viewFinder={() =>
          <div className='flex flex-col  bg-[#0008] pb-[80px] h-[100vh]'>
            <HeaderBackButton title='Escaneá el código QR para pagar' />
            {onErrorDevice ?
              <div className='flex bg-slate-100 w-[70%] aspect-square m-auto rounded-xl justify-center items-center'>
                <p>No se encontró una cámara</p>
              </div>
              :
              <div className='w-[87%] max-h-[80vh] aspect-square grid grid-cols-2 grid-rows-2  m-auto relative backdrop-brightness-[1.8]'>
                <span className='w-[40%] block aspect-square border-t-4 border-l-4 relative '></span>
                <span className='w-[40%] block aspect-square border-t-4 border-r-4 relative justify-self-end'></span>
                <span className='w-[40%] block aspect-square border-b-4 border-l-4 relative self-end'></span>
                <span className='w-[40%] block aspect-square border-b-4 border-r-4 relative self-end justify-self-end'></span>
                <span
                  className='w-[110%] justify-self-center h-[4px] absolute animate-[upDown_1s_infinite_ease-in-out_alternate-reverse] bg-[#49DC7B]'></span>
              </div>
            }
            <span className='max-w-[450px] w-full bg-white h-auto rounded-t-3xl fixed bottom-0 flex flex-col border-t-2 py-3 animate__fadeInUp animate__animated'>
              <span className='flex w-[50px] bg-gray-500 h-[4px] absolute left-[50%] translate-x-[-50%] top-1 rounded-2xl mx-auto'></span>
              <button
                onClick={() => setScannerOpen(false)}
                className='text-[16px] flex gap-1 items-center my-auto ml-8 hover:bg-gray-200 w-fit rounded-3xl p-2'
              >Ver mi QR <QrcodeIcon width={20} color='#3B1B80' /></button>
            </span>
          </div>
        }
      />
    </>
  )
}