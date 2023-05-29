
import Select from "react-select";
import HeaderBackButton from "@/components/HeaderBackButton";
import Buttonc from "@/components/Buttonc";

interface Option {
  value: string;
  label: string;
}

const Category = (): JSX.Element => {
  const options: Option[] = [
    { value: "Educacion", label: "Educacion" },
    { value: "Sueldo", label: "Sueldo" },
    { value: "Servicio", label: "Servicio" },
    { value: "Otro", label: "Otro" },
  ];

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

  return (
    <>
      <HeaderBackButton title="Transferencia" />
      <div className="ml-5 mt-5 mb-56">
        <h2 className="mb-2">¿Cual es el motivo?</h2>
        <Select
          options={options}
          className="w-4/5"
          styles={customStyles}
          placeholder=""
        />
      </div>
      <Buttonc styled={true} action="continuar" href="/newTransfer/send">
        Continuar
      </Buttonc>
      <Buttonc styled={false}  href="/home">
        Cancelar
      </Buttonc>
    </>
  );
};

export default Category;

