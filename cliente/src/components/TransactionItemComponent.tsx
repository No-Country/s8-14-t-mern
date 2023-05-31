import { ITransactions } from "@/types";
import { ListItem } from "@tremor/react";
type Props = {
  item: ITransactions;
  inHome?: boolean;
};
export function TransactionItem({ item, inHome }: Props) {
  const { receiver, createdAt, amount, transaction_type, sender } = item;

  const date = new Date(createdAt);
  return (
    <ListItem className="py-4 px-2 flex ">
      <img src={transaction_type === "debit" ? receiver.avatar : sender.avatar} className="w-[2rem] aspect-square bg-slate-50 my-1 mr-3 rounded-md" />
      <div className="mr-auto">
        <p className=" text-black font-bold mb-1">
          {transaction_type === "debit"
            ? `Envío a ${receiver.firstName} ${receiver.lastname}`
            : `Transferencia de ${sender.firstName} ${sender.lastname}`}
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
      {transaction_type !== "debit" ? (
        <p className=" text-green-500 font-semibold">+${amount}</p>
      ) : (
        <p className=" text-black font-semibold">-${amount}</p>
      )}
    </ListItem>
  );
}
