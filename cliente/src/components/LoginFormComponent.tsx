import logo from "../assets/Pigmeo.png";
import axios from "axios"
import{useContext} from 'react'
import { useFormik} from "formik";
import * as Yup from "yup";
import "../styles/Login.scss";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContex";

// Aa1234567$ password example
const LoginForm = (): JSX.Element => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must contain at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character"
        ),
    }),

     onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:9000/api/v1/pigmeo/users/login",
          values
        );
        console.log("response", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(true)
        navigate("/home");
      } catch (err) {
        console.error("Error", err);
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
          <a href="/">forgot my password</a>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
