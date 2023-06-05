import { useState, useEffect } from "react";
import apiCriptos from "@/services/criptos";

import HeaderBackButton from "@/components/HeaderBackButton";

function CriptoPage() {
  const [criptos, setCriptos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiCriptos.getCriptoInfo();
        console.log(response);
        setCriptos(response?.data);
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <HeaderBackButton title="Finanzas" />
      <div className="w-11/12 max-w-7xl mx-auto my-10 rounded shadow-xl border p-4">
        <ul className="flex flex-col  [&>li:not(:last-child)]:border-b-2">
          {criptos.map((cripto, i) => (
            <ListItem key={i} cripto={cripto} />
          ))}
        </ul>
      </div>
    </>
  );
}

interface Cripto {
  name: string;
  symbol: string;
  current_price: string;
}
function ListItem({ cripto }: { cripto: Cripto }) {
  const { name, symbol, current_price } = cripto;
  return (
    <li className="flex flex-wrap gap-4 items-center px-2 py-6 cursor-pointer ">
      <img
        className="w-10 h-10 "
        src={`https://coinicons-api.vercel.app/api/icon/${symbol?.toLowerCase()}`}
      />
      <div className="flex-grow">
        <h5 className="font-bold">{name}</h5>
        <h6 className="font-light text-gray-400">{symbol}</h6>
      </div>
      <div className="text-right">
        <p className="text-sm">
          {Number(current_price).toFixed(3)}
          &nbsp;&nbsp;USD
        </p>
        <span className="text-sm text-green-500">-4,41%</span>
      </div>
    </li>
  );
}
export default CriptoPage;
