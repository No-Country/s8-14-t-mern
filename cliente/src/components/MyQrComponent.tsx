import { QRCodeSVG } from 'qrcode.react'
import HeaderBackButton from './HeaderBackButton'
import { useUserData } from '@/context/UserContext'
import html2canvas from 'html2canvas'
import saveAs from 'file-saver'
export default function MyQrComponent() {
  const { user } = useUserData()
  const userQr = {
    id: user.id,
    avatar: user.avatar,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  }
  function getQrImage() {
    const element = document.getElementById('qrToDownload');
    element && html2canvas(element).then((canvas) => {
      canvas.toBlob((blob) => {
        blob && saveAs(blob, `Qr-${user.firstName}-${user.lastName}.png`);
      });
    });
  }
  return (
    <div
      className={`w-full flex flex-col bg-white`}>
      <HeaderBackButton title='Muestra tu código para recibir dinero' />
      <div id='qrToDownload' className='m-auto p-7 relative'>
        <QRCodeSVG className='m-auto' value={JSON.stringify(userQr)} size={300} />
        <div className='text-center'>
          <p>{`${user.firstName} ${user.lastName}`} </p>
          <p>{`${user.id}`} </p>
        </div>
      </div>
      <button onClick={getQrImage} className='fixed bg-primary text-white rounded-xl p-3 bottom-2 right-2 w-fit h-fit m-auto'>Descargar</button>
    </div>
  )
}