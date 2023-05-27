import { List } from '@tremor/react'
import HeaderBackButton from "@/components/HeaderBackButton"
import { useUserData } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import { getUserTransactions } from '@/services/transactions';
import { ITransactions } from '@/types';
import { TransactionItem } from '@/components/TransactionItemComponent';

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
            transactions.map((item) => TransactionItem(item))
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