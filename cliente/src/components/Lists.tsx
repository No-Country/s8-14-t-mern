import { Card, Title, List, ListItem } from "@tremor/react";
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
];
export default function Lists(): JSX.Element {
  return (
    <div className="mx-4">
      <div className="flex justify-between ">
        <h1>Actividad</h1>
        <h2>ver todo</h2>
      </div>
      <Card>
        <Title>Hoy</Title>
        <List className="bg-slate-200 rounded-md">
          {transferencias.map(({ nombre, monto, type }) =>
            <ListItem className="py-2 px-4 flex ">
              <span className="w-[25px] aspect-square bg-slate-50 my-1 mr-3 rounded-md" />
              <div className='mr-auto'>
                <p className=" text-black">{nombre}</p>
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
      </Card>
    </div>
  );
}
