import { ReactElement } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { Text, Title } from "@tremor/react";
import { DuplicateIcon } from "@heroicons/react/outline";

import HeaderBackButton from "@/components/HeaderBackButton";

function AddFundsByTransfer(): ReactElement {
  const copyCBUHandler = () => {
    window.navigator.clipboard.writeText("34345446532221");
    toast.success("CBU Copiado");
  };

  return (
    <>
      <HeaderBackButton title="Agregar dinero" />
      <div className="px-5 my-10">
        <Title>
          Ingresa tu cbu en la app de tu banco para hacer la transferencia.
        </Title>
        <Text className="mt-10 mb-2">Mi CBU</Text>
        <div className="flex gap-6 items-center justify-between pr-8 p-3 rounded-lg bg-primary-50">
          34345446532221
          <button className="flex items-center gap-1" onClick={copyCBUHandler}>
            <DuplicateIcon className="w-6 h-6 text-primary" />
            Copiar CBU
          </button>
        </div>
      </div>
    </>
  );
}
export default AddFundsByTransfer;
