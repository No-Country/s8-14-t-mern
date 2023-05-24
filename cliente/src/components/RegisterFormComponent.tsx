import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/Login.scss';
import { register } from '@/services/register';
import { useContext } from 'react';
import { UserContext } from '@/context/ReactContext';


// nECESITAMOS CREAR BOTON VOLVER A ELEGIR
const RegisterForm = (): JSX.Element => {
  const { isLogin } = useContext(UserContext)
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      firstName: '',
      lastname: '',
      email: '',
      password: '',
      repeatPassword: '',
      country: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Name is required'),
      lastname: Yup.string().required('Lastname is required'),
      email: Yup.string().email('Enter a valid email').required('Email is required').max(50),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must contain at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
      repeatPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Password is required'),
      country: Yup.string().required('Country is required'),
    }),
    onSubmit: () => {
      (async () => {
        const state = await register(values)
        isLogin.current = state
        location.reload()
      })()
    }
  })

  const countryOptions = [
    { value: 'Argentina', label: 'Argentina' },
    { value: 'Brazil', label: 'Brazil' },
    { value: 'Mexico', label: 'Mexico' },
    { value: 'Colombia', label: 'Colombia' },
  ];

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
          {errors.firstName && touched.firstName && <div className="error">{errors.firstName}</div>}
          <input
            name="lastname"
            id="lastname"
            type="name"
            placeholder="lastname"
            onChange={handleChange}
            value={values.lastname}
            className="input input-password"
          />
          {errors.lastname && touched.lastname && <div className="error">{errors.lastname}</div>}


          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={values.email}
            className="input input-password"
          />
          {errors.email && touched.email && <div className="error">{errors.email}</div>}


          <select
            name="country"
            id="country"
            onChange={handleChange}
            value={values.country}
            className="input input-country"
          >
            <option value="">Moneda</option>
            {countryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.country && touched.country && <div className="error">{errors.country}</div>}

          <input
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={values.password}
            className="input input-password"
          />
          {errors.password && touched.password && <div className="error">{errors.password}</div>}


          <input
            name="repeatPassword"
            id="repeatPassword"
            type="password"
            placeholder="Confirm password"
            onChange={handleChange}
            value={values.repeatPassword}
            className="input input-password"
          />
          {errors.repeatPassword && touched.repeatPassword && <div className="error">{errors.repeatPassword}</div>}


          <button type="submit" className="primary-button login-button">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
