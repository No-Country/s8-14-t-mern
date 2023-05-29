import { useUserData } from "@/context/UserContext";
import { getUserTransactions } from "@/services/transactions";
import { ITransactions } from "@/types";
import { Card, List } from "@tremor/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TransactionItem } from "./TransactionItemComponent";
export default function Lists(): JSX.Element {

  const [transactions, setTransactions] = useState<ITransactions[] | []>([])
  const { user } = useUserData()
  useEffect(() => {
    (async () => {
      try {
        const res = await getUserTransactions(user?.id)
        setTransactions(res.data.data.slice(0, 3))

      } catch (error) {
        console.error(error);
      }
    })()
  }, [])
  return (
    <div className="mx-4">
      <div className="flex justify-between items-center p-2">
        <p className="font-medium">Actividad</p>
        <Link className=" text-primary font-medium" to={"/transactions"}>Ver todo</Link>
      </div>
      <Card>
        <p className=" font-normal">Recientes</p>
        <List className="bg-white rounded-md">
          {transactions.length ?
            transactions.map((item) => TransactionItem({ item, inHome: true }))
            :
            <div className='flex h-[50px] '>
              <p className='m-auto'>No tienes ningún movimiento</p>
            </div>
          }
        </List>
      </Card>
    </div>
  );
}
