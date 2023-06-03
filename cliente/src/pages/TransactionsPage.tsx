import { List } from "@tremor/react";
import HeaderBackButton from "@/components/HeaderBackButton";
import { useUserData } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { getUserTransactions } from "@/services/transactions";
import { ITransactions } from "@/types";
import { TransactionItem } from "@/components/TransactionItemComponent";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<ITransactions[] | []>([]);
  const { user } = useUserData();
  useEffect(() => {
    (async () => {
      try {
        const res = await getUserTransactions(user?.id);
        console.log(res);
        setTransactions(res.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <HeaderBackButton title="Actividad" />

      <section className="bg-primary text-white flex flex-col items-center h-[170px] gap-4">
        <p className=" text-[1.13rem]">Saldo Pigmeo disponible</p>
        <p className=" font-bold text-[1.5rem]">
          $ {user?.balance?.toLocaleString()}
        </p>
      </section>
      <section className="relative h-fit">
        <List className=" bg-white border rounded-md w-[90%] left-[5%] relative top-[-70px]">
          {transactions.length ? (
            transactions.map((item) => TransactionItem({ item, inHome: false }))
          ) : (
            <div className="flex h-[50px] ">
              <p className="m-auto">No tienes ningún movimiento</p>
            </div>
          )}
        </List>
      </section>
    </>
  );
}
