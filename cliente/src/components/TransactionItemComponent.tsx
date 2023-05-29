import { ITransactions } from "@/types"
import { ListItem } from "@tremor/react"
type Props = {
  item: ITransactions
  inHome?: boolean
}
export function TransactionItem({ item, inHome }: Props) {
  const { receiver, createdAt, amount, transaction_type } = item

  const date = new Date(createdAt)
  return (
    <ListItem className="py-4 px-2 flex ">
      <span className="w-[1.875rem] aspect-square bg-slate-50 my-1 mr-3 rounded-md" />
      <div className='mr-auto'>
        <p className=" text-black font-bold mb-1">
          {transaction_type === "debit" ? `Envío a ${receiver.firstName} ${receiver.lastname}` :
            `Transferencia de ${receiver.firstName} ${receiver.lastname}`}
        </p>
        {!inHome &&
          <p className=" text-gray-500">
            {
              `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}   
            ${date.getHours()}:${date.getMinutes()}hs
            `
            }
          </p>
        }
      </div>
      {transaction_type !== "debit" ?
        <p className=" text-green-500 font-semibold">+${amount}</p>
        :
        <p className=" text-black font-semibold">-${amount}</p>
      }
    </ListItem>
  )
}