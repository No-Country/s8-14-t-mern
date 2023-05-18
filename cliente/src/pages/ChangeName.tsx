import HeaderBackButton from "@/components/HeaderBackButton";
import NavBar from "@/components/NavBar";

export default function ChangeName(): JSX.Element {
    return(
        <>
        <HeaderBackButton title="Cambiar nombre"/>
        <div className="flex flex-col mt-16 ml-6">
        <label>Nombre completo</label>
        <input type="name" className="mt-3 w-4/5 h-11 outline-none bg-rose-100"/>
        </div>
        <div className="flex flex-col items-center mt-28">
            <button className="rounded-full bg-gray-400 w-11/12 h-14 text-xl ">guardar</button>
            <a href="/personalData" className="mt-10 no-underline">Cancelar</a>
        </div>
        <NavBar />

        </>
    )

}