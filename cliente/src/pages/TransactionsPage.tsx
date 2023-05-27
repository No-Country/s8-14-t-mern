import { List, ListItem } from '@tremor/react'
import HeaderBackButton from "@/components/HeaderBackButton"
interface Transferencia {
  nombre: string;
  hora: Date;
  monto: number;
  type: string
}

const transferencias: Transferencia[] = [
  { nombre: "Juan", hora: new Date(), monto: 100, type: "in" },
  { nombre: "María", hora: new Date(), monto: 200, type: "out" },
  { nombre: "Pedro", hora: new Date(), monto: 150, type: "out" },
  { nombre: "Carlos", hora: new Date(), monto: 1050, type: "in" },
  { nombre: "Manuel", hora: new Date(), monto: 120, type: "out" },
  { nombre: "Pedro", hora: new Date(), monto: 10, type: "in" },
];
export default function TransactionsPage() {
  return (
    <>
      <HeaderBackButton title='Movimientos' />
      <main className='p-5'>
        <List className="bg-slate-300 rounded-md">
          {transferencias.map(({ nombre, hora, monto, type }) =>
            <ListItem className="py-2 px-4 flex ">
              <span className="w-[30px] aspect-square bg-slate-50 my-1 mr-3 rounded-md" />
              <div className='mr-auto'>
                <p className=" text-black">{nombre}</p>
                <p className=" text-black">
                  {
                    `${hora.getHours()}/${hora.getMonth()}/${hora.getFullYear()}   
                    ${hora.getHours()}:${hora.getMinutes()}hs
                  `
                  }
                </p>
              </div>
              {type === "in" &&
                <p className=" text-green-500">+${monto}</p>
              }
              {type === "out" &&
                <p className=" text-red-500">-${monto}</p>
              }
            </ListItem>
          )}
        </List>
      </main >
    </>
  )
}