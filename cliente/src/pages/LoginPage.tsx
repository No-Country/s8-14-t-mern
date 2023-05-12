import logo from '../assets/Pigmeo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/Login.scss';
import { useNavigate } from 'react-router-dom';



// Aa1234567$ password example
const LoginPage = (): JSX.Element => {

  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Enter a valid email').required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must contain at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    }),

    onSubmit: async (values) => {
      console.log(values);
      navigate('/home');
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
          {errors.email && <div className="error">{errors.email}</div>}
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
          {errors.password && <div className="error">{errors.password}</div>} {/* Mostrar el mensaje de error */}
          <button type="submit" className="primary-button login-button">
            Log in
          </button>

          <a href="/">forgot my password</a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
