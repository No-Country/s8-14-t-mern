import { List } from "@tremor/react";
import HeaderBackButton from "@/components/HeaderBackButton";
import { useUserData } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { getUserTransactions } from "@/services/transactions";
import { ITransactions } from "@/types";
import { TransactionItem } from "@/components/TransactionItemComponent";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<ITransactions[] | []>([]);
  const [loading, setLoading] = useState(true)
  const { user } = useUserData();
  useEffect(() => {
    (async () => {
      try {
        const res = await getUserTransactions(user?.id);
        setTransactions(res.data.data);
        setLoading(false)
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
        <p className=" font-bold text-[1.5rem]">${user.balance}</p>
      </section>
      <section className="relative h-fit">

        <List className=" bg-white border rounded-md w-[90%] left-[5%] relative top-[-70px]">
          {loading ?
            <div className="flex h-[50px] ">
              <p className="m-auto">Cargando...</p>
            </div> :
            transactions.length ? (
              transactions.map((item, index) => TransactionItem({ item, inHome: false, index, place:"transactionPage" }))
            ) : (
              <div className="flex h-[50px] ">
                <p className="m-auto">No tienes ningún movimiento</p>
              </div>
            )
          }
        </List>
      </section>
    </>
  );
}
