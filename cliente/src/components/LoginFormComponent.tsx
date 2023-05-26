import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useUserData } from "@/context/UserContext";
import apiUsers from "@/services/users";

import * as Yup from "yup";
import toast from "react-hot-toast";
import logo from "../assets/Pigmeo.png";
import "../styles/Login.scss";

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
    <div className="Login">
      <div className="Login-container">
        <img src={logo} alt="logo" className="logo" />
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="Email" className="label">
            Email address
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="enter your email"
            onChange={handleChange}
            value={values.email}
            className="input input-password"
          />
          {errors.email && touched.email && <div>{errors.email}</div>}
          <label htmlFor="Password" className="label">
            Password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="enter your password"
            onChange={handleChange}
            value={values.password}
            className="input input-password"
          />
          {errors.password && touched.password && (
            <div className="error">{errors.password}</div>
          )}{" "}
          {/* Mostrar el mensaje de error */}
          <button type="submit" className="primary-button login-button">
            Log in
          </button>
          <Link to="/resetPassword/request">forgot my password</Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
