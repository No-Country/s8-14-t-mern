import { useState } from 'react';
import QrScannerComponent from '@/components/QrScannerComponent';
import MyQrComponent from '@/components/MyQrComponent';
export default function ScannerQrPage() {
  const [scannerOpen, setScannerOpen] = useState(true)
  return (
    <main className='h-[100vh] flex overflow-hidden'>
      {scannerOpen ? <QrScannerComponent /> : <MyQrComponent />}
      <button onClick={() => setScannerOpen(!scannerOpen)} className='fixed bg-primary text-white rounded-xl p-3 bottom-2 left-2 w-fit h-fit m-auto'>{scannerOpen ? "Ver mi QR" : "Escanea un QR"}</button>
    </main>
  )
}