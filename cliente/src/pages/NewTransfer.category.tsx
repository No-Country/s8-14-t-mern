import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import HeaderBackButton from "@/components/HeaderBackButton";
import Buttonc from "@/components/Buttonc";
import { useNewTranferData } from "@/context/NewTransferContext";

interface Option {
  value: string;
  label: string;
}

const customStyles = {
  // Custom styles object
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "white",
    borderColor: state.isFocused ? "blue" : "black",
    boxShadow: state.isFocused ? "0 0 0 1px #3B1B80" : "none",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#3B1B80" : "white",
    color: state.isSelected ? "white" : "black",
    "&:active": {
      backgroundColor: "transparent",
    },
  }),
};
const options: Option[] = [
  { value: "Educacion", label: "Educacion" },
  { value: "Sueldo", label: "Sueldo" },
  { value: "Servicio", label: "Servicio" },
  { value: "Otro", label: "Otro" },
];

const Category = (): JSX.Element => {
  const navigate = useNavigate();
  const { transferData, setTransferData } = useNewTranferData();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const reference = formData.get("reference") as string;
    setTransferData((prev) => ({ ...prev, reference }));
    navigate("/newTransfer/send");
  };
  return (
    <>
      <HeaderBackButton title="Transferencia" />
      <form className="mx-5 mt-5" onSubmit={submitHandler}>
        <h2 className="mb-2">¿Cual es el motivo?</h2>
        <Select
          name="reference"
          defaultValue={{
            label: transferData?.reference,
            value: transferData?.reference,
          }}
          options={options}
          className="w-4/5 mb-56"
          styles={customStyles}
          placeholder=""
        />
        <button
          type="submit"
          className="bg-primary text-white px-5 py-3 rounded-2xl w-full"
        >
          Continuar
        </button>
      </form>
      {/*  <Buttonc styled={true} action="continuar" href="/newTransfer/send">
        Continuar
      </Buttonc> */}
      <Buttonc styled={false} href="/home">
        Cancelar
      </Buttonc>
    </>

  );
};

export default Category;
