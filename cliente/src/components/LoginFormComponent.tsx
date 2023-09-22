import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useUserData } from "@/context/UserContext";
import apiUsers from "@/services/users";

import * as Yup from "yup";
import toast from "react-hot-toast";
import logo from "../assets/logo-light.svg";
import eyesOn from '../assets/eye.svg';
import eyesOff from '../assets/eyeslash.svg';
import Loader from "./Loader";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const LoginForm = (): JSX.Element => {
  const [ShowPass, setShowPass] = useState(false)
  const [passType, setpassType] = useState('password');
  const { setUserData } = useUserData();
  const [isLoading, setIsLoading] = useState(false);

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Ingresar un email valido")
        .required("Email es requerido"),
      password: Yup.string()
        .required("Contraseña es requerida")
        .min(8, "Contraseña debe contener min 8 caracteres")
        .matches(/[A-Z]/, "Contraseña debe contener una Mayuscula")
        .matches(/[a-z]/, "Contraseña debe contener una minuscula")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Contraseña debe contener una caracter especial"
        ),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const {
          data: { data },
        } = await apiUsers.loginUser(values);

        if (!data) {
          throw new Error("Error al iniciar sesión");
        }
        setUserData(data);
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data || "Error al iniciar sesión");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handlePassword = () => {
    if (passType === 'password')
      setpassType('text')
    else setpassType('password')
  }

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="w-[95vw] h-full flex flex-col gap-3 justify-center items-center"
      >
        <img src={logo} alt="logo" className="w-80" />

        <label className="text-red-600 w-full flex flex-col items-center justify-center mt-14">
          <input
            className="
            w-full
            h-12 
            p-2 
            border 
            border-gray-300 
            rounded-lg  
            outline-0 
            focus:ring 
            ring-primary-200 
            text-black"
            placeholder="Correo electrónico"
            name="email"
            id="email"
            type="email"
            onChange={handleChange}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
        </label>

        <label className="text-red-600 w-full flex flex-col relative items-center">
          <input
            className="
            w-full
            h-12 
            p-2 
            border 
            border-gray-300 
            rounded-lg  
            outline-0 
            focus:ring 
            ring-primary-200 
            text-black"
            placeholder="Contraseña"
            name="password"
            id="password"
            type={ShowPass ? "text" : "password"}
            onChange={handleChange}
            value={values.password}
          />
          <div id="eyepass" className="absolute w-12 h-12 flex justify-center items-center right-0 text-primary-400"
            onMouseEnter={handlePassword}
            onMouseOut={handlePassword}
          >
            {ShowPass ?
              <EyeIcon width={30} onClick={() => setShowPass(!ShowPass)} />
              :
              <EyeOffIcon width={30} onClick={() => setShowPass(!ShowPass)} />
            }
          </div>
          {errors.password && touched.password && errors.password}
        </label>
        <div className="w-full flex justify-center">
          <Link
            to="/resetPassword/request"
            className="text-primary self-start underline w-full"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <button
            type="submit"
            className="bg-primary text-white w-full p-2 rounded mt-7"
          >
            Iniciar sesión
          </button>
        )}
        <Link className='underline' to={"/auth/register"}>Registrarse</Link>
      </form>
    </div>
  );
};

export default LoginForm;
