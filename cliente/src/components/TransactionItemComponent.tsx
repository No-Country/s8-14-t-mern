import { ITransactions } from "@/types"
import { ListItem } from "@tremor/react"

export function TransactionItem({ receiver, createdAt, amount, transaction_type }: ITransactions) {
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
      {transaction_type !== "debit" &&
        <p className=" text-green-500">+${amount}</p>
      }
      {transaction_type === "debit" &&
        <p className=" text-red-500">-${amount}</p>
      }
    </ListItem>
  )
}