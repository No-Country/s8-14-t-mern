import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/Login.scss';
import { useNavigate } from 'react-router-dom';



// nECESITAMOS CREAR BOTON VOLVER A ELEGIR
const RegisterPage = (): JSX.Element => {

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password2: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Enter a valid email').required('Email is required').max(50),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must contain at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
      password2: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Password is required'),
    }
    ),

    onSubmit: async (values) => {
      console.log(values);
      // Hacer la peticion al bac
      //Capeta servicio
    },
  });

  return (
    <div className="Login">
      <div className="Login-container">
        <h1 className="Title">Create your account</h1>
        <h6 className="Title">fill in your profile</h6>
        <form onSubmit={handleSubmit} className="form">

          <input
            name="name"
            id="name"
            type="name"
            placeholder="Name and Surname"
            onChange={handleChange}
            value={values.name}
            className="input input-password"
          />
          {errors.name && <div className="error">{errors.name}</div>}


          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={values.email}
            className="input input-password"
          />
          {errors.email && <div className="error">{errors.email}</div>}

          <input
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={values.password}
            className="input input-password"
          />
          {errors.password && <div className="error">{errors.password}</div>}


          <input
            name="password2"
            id="password2"
            type="password"
            placeholder="Confirm password"
            onChange={handleChange}
            value={values.password2}
            className="input input-password"
          />
          {errors.password2 && <div className="error">{errors.password2}</div>}


          <button type="submit" className="primary-button login-button">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
