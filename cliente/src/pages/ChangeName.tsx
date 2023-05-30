import HeaderBackButton from "@/components/HeaderBackButton";

export default function ChangeName(): JSX.Element {
  return (
    <>
      <HeaderBackButton title="Cambiar nombre" />
      <div className="flex flex-col items-center mt-16 ml-4">
      <div className="flex justify-start w-80">
      <label className="">Nombre completo</label>
    </div>
        <input
          type="name"
          className="mt-3 w-80 h-12 border-2 border-[#9BA4B4] outline-primary"
        />
      
      
        <button className="rounded-sm bg-primary w-80 h-12 text-xl text-white mt-14 ">
          Guardar
        </button>
        <div className="flex justify-center w-full">
    <a href="/personalData" className="mt-10 no-underline">
      Cancelar
    </a>
  </div>
        </div>
      
    </>
  );
}
