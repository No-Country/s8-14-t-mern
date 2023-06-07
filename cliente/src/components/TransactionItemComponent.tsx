import { ITransactions } from "@/types";
import { ListItem } from "@tremor/react";
type Props = {
  item: ITransactions;
  inHome?: boolean;
  index: number;
  place: string;
};
export function TransactionItem({ item, inHome, index, place }: Props) {
  const { receiver, createdAt, amount, transaction_type, sender } = item;

  const date = new Date(createdAt);
  return (
    <ListItem key={`${place}-item-${index}`} className=" p-4 flex ">
      <img src={transaction_type === "debit" ? receiver.avatar : sender.avatar} className="w-[40px] aspect-square bg-slate-50 my-1 mr-3 rounded-md" />
      <div className="mr-auto flex flex-col gap-1">
        <p className=" text-black font-bold whitespace-normal ">
          {(transaction_type === "credit") && `Transferencia de ${sender.firstName} ${sender.lastname}`}
          {(transaction_type === "deposit") && `Ingresaste dinero`}
          {(transaction_type === "debit") && `Envío a ${receiver.firstName} ${receiver.lastname}`}
        </p>
        {!inHome && (
          <p className=" text-gray-500">
            {date.toLocaleDateString("default", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
            hs
          </p>
        )}
      </div>
      {(transaction_type === "credit") && <p className=" text-green-500 font-semibold">+${amount}</p>}
      {(transaction_type === "deposit") && <p className=" text-green-500 font-semibold">+${amount}</p>}
      {(transaction_type === "debit") && <p className=" text-black font-semibold">-${amount}</p>}
    </ListItem>
  );
}
