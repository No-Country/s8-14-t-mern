import { useState } from 'react';
import useRegister from "@/hooks/useRegister";
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';
// nECESITAMOS CREAR BOTON VOLVER A ELEGIR
const RegisterForm = (): JSX.Element => {
  const [ShowPass, setShowPass] = useState(false)
  const [ShowRepeatPass, setShowRepeatPass] = useState(false)
  const { errors, handleChange, handleSubmit, touched, values } = useRegister();

  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit} className="w-[328px] h-full flex flex-col gap-6 justify-center items-center">
        <div className="w-full">
          <h1 className="text-2xl font-semibold mb-2">Creá tu cuenta</h1>
          <h6 className="text-base font-normal mb-1">Completá tu perfil</h6>
        </div>
        <label className="text-red-600 w-full flex flex-col relative items-center">
          <input
            className="
            w-[328px]
            h-12 
            p-2 
            border 
            border-gray-300 
            rounded-lg  
            outline-0 
            focus:ring 
            ring-primary-200 
            text-black"
            name="firstName"
            id="firstName"
            type="firstName"
            placeholder="Nombre de usuario"
            onChange={handleChange}
            value={values.firstName}
          />
          {errors.firstName && touched.firstName && (
            <div className="error self-start  text-sm absolute top-12">{errors.firstName}</div>
          )}
        </label>
        <label className="text-red-600 w-full flex flex-col relative  items-center">
          <input
            className="
            w-[328px]
            h-12 
            p-2 
            border 
            border-gray-300 
            rounded-lg  
            outline-0 
            focus:ring 
            ring-primary-200 
            text-black"
            name="lastname"
            id="lastname"
            type="name"
            placeholder="Apellido"
            onChange={handleChange}
            value={values.lastname}
          />
          {errors.lastname && touched.lastname && (
            <div className="error self-start  text-sm absolute top-12">{errors.lastname}</div>
          )}
        </label>
        <label className="text-red-600 w-full flex flex-col relative  items-center">
          <input
            className="
            w-[328px]
            h-12 
            p-2 
            border 
            border-gray-300 
            rounded-lg  
            outline-0 
            focus:ring 
            ring-primary-200 
            text-black"
            name="email"
            id="email"
            type="email"
            placeholder="Correo electronico"
            onChange={handleChange}
            value={values.email}
          />
          {errors.email && touched.email && (
            <div className="error self-start  text-sm absolute top-12">{errors.email}</div>
          )}
        </label>
        <label className="text-red-600 w-full flex flex-col relative items-center">
          <input
            className="
            w-[328px]
            h-12 
            p-2 
            border 
            border-gray-300 
            rounded-lg  
            outline-0 
            focus:ring 
            ring-primary-200 
            text-black"
            name="password"
            id="password"
            type={ShowPass ? "text" : "password"}
            placeholder="Contraseña"
            onChange={handleChange}
            value={values.password}
          />
          <div className="absolute w-12 h-12 flex justify-center items-center right-0 text-primary-400"
          >
            {ShowPass ?
              <EyeIcon width={30} onClick={() => setShowPass(!ShowPass)} />
              :
              <EyeOffIcon width={30} onClick={() => setShowPass(!ShowPass)} />
            }
          </div>
          {errors.password && touched.password && (
            <div className="error self-start  text-sm absolute top-12">{errors.password}</div>
          )}
        </label>
        <label className="text-red-600 w-full flex flex-col relative  items-center">
          <input
            className="
            w-[328px]
            h-12 
            p-2 
            border 
            border-gray-300 
            rounded-lg  
            outline-0 
            focus:ring 
            ring-primary-200 
            text-black"
            name="repeatPassword"
            id="repeatPassword"
            type={ShowRepeatPass ? "text" : "password"}
            placeholder="Confirmar contraseña"
            onChange={handleChange}
            value={values.repeatPassword}
          />
          <div className="absolute w-12 h-12 flex justify-center items-center right-0 text-primary-400">
            {ShowRepeatPass ?
              <EyeIcon width={30} onClick={() => setShowRepeatPass(!ShowRepeatPass)} />
              :
              <EyeOffIcon width={30} onClick={() => setShowRepeatPass(!ShowRepeatPass)} />
            }
          </div>
          {errors.repeatPassword && touched.repeatPassword && (
            <div className="error self-start  text-sm absolute top-12">{errors.repeatPassword}</div>
          )}
        </label>

        <div className="flex flex-col w-[328px] relative items-start mt-6">
          <div className="flex">
            <input
              className="w-5 h-8 mr-2"
              type="checkbox"
              name="aceptarTerminos"
              checked={values.aceptarTerminos}
              onChange={handleChange}
            />
            <p className="font-light text-lg">Aceptos los <strong className=" font-bold text-primary-700 underline">
              Términos y Condiciones y
              Políticas de privacidad
            </strong>
            </p>
            {errors.aceptarTerminos && touched.aceptarTerminos && (
              <div className=" text-red-600  error self-start  text-xs mt-2 absolute top-12">{errors.aceptarTerminos}</div>
            )}
          </div>

        </div>

        <button type="submit"
          disabled={!values.aceptarTerminos}
          className={`text-white w-[328px] h-12 p-2 rounded-lg mt-4 ${!values.aceptarTerminos ? "bg-primary-200 cursor-auto" : "bg-primary-500 cursor-pointer"}`}>
          Registrarme
        </button>
        <Link className='underline' to={"/auth/login"}>Iniciar sesión</Link>
      </form>
    </div>
  );
};

export default RegisterForm;
