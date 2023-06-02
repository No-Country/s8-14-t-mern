import HeaderBackButton from "@/components/HeaderBackButton";
import { updateUser } from "@/services/users";
import { useUserData } from "@/context/UserContext";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ChangeName(): JSX.Element {
  const { user, setUser } = useUserData();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  const handleSave = () => {
    const updatedUser = {
      ...user,
      firstName,
      lastName,
    };
    updateUser(updatedUser)
      .then(() => {
        setUser(updatedUser);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
          onChange={(e) => {
            const [firstName, lastName] = e.target.value.split(" ");
            setFirstName(firstName);
            setLastName(lastName);
          }}
        />

        <Link to="/personaldata">
          <button
            onClick={handleSave}
            className="rounded-sm bg-primary w-80 h-12 text-xl text-white mt-14 "
          >
            Guardar
          </button>
        </Link>
        <div className="flex justify-center w-full">
          <a href="/personalData" className="mt-10 no-underline">
            Cancelar
          </a>
        </div>
      </div>
    </>
  );
}
