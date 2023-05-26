import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/Login.scss";
import toast from "react-hot-toast";

import apiUsers from "@/services/users";

// nECESITAMOS CREAR BOTON VOLVER A ELEGIR
const RegisterForm = (): JSX.Element => {
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      firstName: "",
      lastname: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Name is required"),
      lastname: Yup.string().required("Lastname is required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required")
        .max(50),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must contain at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character"
        ),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await apiUsers.registerUser(values);
        console.log(response);
        toast.success(
          response?.data?.msg || "Registro existoso, verifica tu cuenta",
          { duration: 10000 }
        );
      } catch (error: any) {
        console.log(error);
        toast.error("Error al Registrar");
      }
    },
  });

  return (
    <div className="Login">
      <div className="Login-container">
        <h1 className="Title">Create your account</h1>
        <h6 className="Title">fill in your profile</h6>
        <form onSubmit={handleSubmit} className="form">
          <input
            name="firstName"
            id="firstName"
            type="firstName"
            placeholder="Name and Surname"
            onChange={handleChange}
            value={values.firstName}
            className="input input-password"
          />
          {errors.firstName && touched.firstName && (
            <div className="error">{errors.firstName}</div>
          )}
          <input
            name="lastname"
            id="lastname"
            type="name"
            placeholder="lastname"
            onChange={handleChange}
            value={values.lastname}
            className="input input-password"
          />
          {errors.lastname && touched.lastname && (
            <div className="error">{errors.lastname}</div>
          )}

          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={values.email}
            className="input input-password"
          />
          {errors.email && touched.email && (
            <div className="error">{errors.email}</div>
          )}

          <input
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={values.password}
            className="input input-password"
          />
          {errors.password && touched.password && (
            <div className="error">{errors.password}</div>
          )}

          <input
            name="repeatPassword"
            id="repeatPassword"
            type="password"
            placeholder="Confirm password"
            onChange={handleChange}
            value={values.repeatPassword}
            className="input input-password"
          />
          {errors.repeatPassword && touched.repeatPassword && (
            <div className="error">{errors.repeatPassword}</div>
          )}

          <button type="submit" className="primary-button login-button">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
