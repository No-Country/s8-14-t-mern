import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useUserData } from "@/context/UserContext";
import apiUsers from "@/services/users";

import * as Yup from "yup";
import toast from "react-hot-toast";
import logo from "../assets/logo-light.svg";
import Loader from "@/components/Loader";

const LoginForm = (): JSX.Element => {
  // Aa1234567$ password example
  const { setUserData } = useUserData();
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      /* .min(8, "Password must contain at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character"
        ), */
    }),

    onSubmit: async (values) => {
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
      }
    },
  });

  return (
    <div className="min-h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 max-w-md mx-auto flex flex-col gap-5 justify-center items-center"
      >
        <img src={logo} alt="logo" className="w-full mb-10 -mt-5" />
        <label className="text-red-600 w-full">
          <input
            className="border border-gray-300 rounded-lg  
          outline-0 focus:ring ring-primary-200 w-full p-2.5 text-black"
            placeholder="Correo electrónico"
            name="email"
            id="email"
            type="email"
            onChange={handleChange}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
        </label>
        <label className="text-red-600 w-full">
          <input
            className="border border-gray-300 rounded-lg  
          outline-0 focus:ring ring-primary-200 w-full p-2.5 text-black"
            placeholder="Contraseña"
            name="password"
            id="password"
            type="password"
            onChange={handleChange}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
        </label>
        <Link
          to="/resetPassword/request"
          className="text-primary self-start underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <button
          type="submit"
          className="bg-primary text-white w-full p-2 rounded mt-7"
        >
          Iniciar sesión
        </button>
        {/* <Loader /> */}
      </form>
    </div>
  );
};

export default LoginForm;
