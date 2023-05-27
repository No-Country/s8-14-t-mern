import { List, ListItem } from '@tremor/react'
import HeaderBackButton from "@/components/HeaderBackButton"
import { useUserData } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import { getUserTransactions } from '@/services/transactions';
import { ITransactions } from '@/types';
export function returnItems({ receiver, createdAt, amount, transaction_type }: ITransactions) {
  const date = new Date(createdAt)
  return (
    <ListItem className="py-2 px-4 flex ">
      <span className="w-[30px] aspect-square bg-slate-50 my-1 mr-3 rounded-md" />
      <div className='mr-auto'>
        <p className=" text-black">{receiver.firstName} {receiver.lastname}</p>
        <p className=" text-black">
          {
            `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}   
                  ${date.getHours()}:${date.getMinutes()}hs
                `
          }
        </p>
      </div>
      {transaction_type === "credit" &&
        <p className=" text-green-500">+${amount}</p>
      }
      {transaction_type === "debit" &&
        <p className=" text-red-500">-${amount}</p>
      }
    </ListItem>
  )
}
export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<ITransactions[] | []>([])
  const { user } = useUserData()
  useEffect(() => {
    (async () => {
      try {
        const res = await getUserTransactions(user?.id)
        setTransactions(res.data.data)
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])

  return (
    <>
      <HeaderBackButton title='Movimientos' />
      <main className='p-5'>
        <List className="bg-slate-300 rounded-md">
          {transactions.length ?
            transactions.map((item) => returnItems(item))
            :
            <div className='flex h-[50px] '>
              <p className='m-auto'>No tienes ningun movimiento</p>
            </div>
          }
        </List>
      </main >
    </>
  )
}