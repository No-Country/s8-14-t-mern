import { useState } from 'react';
import QrScannerComponent from '@/components/QrScannerComponent';
import MyQrComponent from '@/components/MyQrComponent';
import "animate.css"

export default function ScannerQrPage() {
  const [scannerOpen, setScannerOpen] = useState(true)
  return (
    <main className='flex'>
      {scannerOpen ? <QrScannerComponent setScannerOpen={setScannerOpen} /> : <MyQrComponent setScannerOpen={setScannerOpen} />}
    </main>
  )
}