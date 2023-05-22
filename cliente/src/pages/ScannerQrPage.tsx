import { ArrowLeftIcon } from '@heroicons/react/outline';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { useNavigate } from 'react-router-dom';

export default function ScannerQrPage() {
  const navigate = useNavigate()
  const codeSucces = (result: string) => {
    console.log(result)
  }
  const codeError = (error: Error) => {
    console.log(error.message)
  }
  return (
    <main className='h-[100vh] flex overflow-hidden'>
      <QrScanner
        onDecode={(result) => codeSucces(result)}
        onError={(error) => codeError(error)}
        containerStyle={{ height: "100%", padding: 0, margin: "auto" }}
        videoStyle={{ maxWidth: "none", width: "auto" }}
        viewFinder={() =>
          <>
            <ArrowLeftIcon className='w-[30px] m-3  fixed top-1 z-10 text-white' onClick={() => navigate("/")} />
            <div className='w-full p-5  fixed bottom-0 z-10 bg-slate-400'>
              <p className=' text-white text-[1.25rem] text-center'>Escaneá el código para pagar</p>
            </div>
          </>
        }
      />
    </main>
  )
}