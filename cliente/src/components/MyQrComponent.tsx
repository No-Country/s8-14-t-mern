import { QRCodeSVG } from 'qrcode.react'
import { useUserData } from '@/context/UserContext'
import html2canvas from 'html2canvas'
import saveAs from 'file-saver'
import { DownloadIcon } from '@heroicons/react/outline'
import Logo from "@/assets/monkey.png"
import { ArrowLeftIcon } from "@heroicons/react/solid";

export default function MyQrComponent({ setScannerOpen }: { setScannerOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { user } = useUserData()
  const userQr = {
    id: user.id,
    alias: user.alias,
    avatar: user.avatar,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  }
  function getQrImage() {
    const element = document.getElementById('qrToDownload');
    element && html2canvas(element).then((canvas) => {
      canvas.toBlob((blob) => {
        blob && saveAs(blob, `Qr-Pigmeo-${user.firstName}-${user.lastname}.png`);
      });
    });
  }
  return (
    <div
      className={`flex flex-col bg-white `}>
      <header className='flex p-[25px]  gap-[40px] items-center'>
        <ArrowLeftIcon className='w-6 h-6' onClick={() => setScannerOpen(true)} />
        <h2 className='text-[20px] font-medium'>Mi QR</h2>
      </header>
      <div className='mx-auto w-[80%] text-center mt-9'>
        <p className='text-[18px] font-medium'>¡Usá tu QR para que te envíen dinero a tu cuenta!</p>
      </div>
      <div className='m-auto relative w-fit'>
        <div id='qrToDownload' className='relative  p-7'>
          <QRCodeSVG
            className='mx-auto rounded-xl'
            value={JSON.stringify(userQr)}
            size={330}
            fgColor='rgb(117,49,202)'
            bgColor='rgb(250,232,255)'
            includeMargin
          />
          <img src={Logo} className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[10%] aspect-square bg-[rgb(250,232,255)] rounded-full '></img>
        </div>
        <button
          onClick={getQrImage}
          className='text-base flex gap-1 items-center ml-auto hover:bg-gray-200 w-fit rounded-3xl p-2 mt-3 mr-7'
        >Descargar QR <DownloadIcon width={20} color='#3B1B80' /></button>
      </div>
    </div>
  )
}