import eyesOn from '../assets/eye.svg';
import eyesOff from '../assets/eyeslash.svg';
import useRegister from "@/hooks/useRegister";

// nECESITAMOS CREAR BOTON VOLVER A ELEGIR
const RegisterForm = (): JSX.Element => {

  const { RepassType, errors, handleChange, handlePassword, handleSubmit, passType, touched, values } = useRegister();

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
            type={passType}
            placeholder="Contraseña"
            onChange={handleChange}
            value={values.password}
          />
          <div className="absolute w-12 h-12 flex justify-center items-center right-0 text-primary-400"
          >
            {
              passType === 'password' ?
                <img id="eyepass" className="w-8 h-8 " src={eyesOff} alt="showContrasena2"
                  onMouseEnter={handlePassword}
                />
                :
                <img id="eyepass2" className="w-8 h-8 " src={eyesOn} alt="hiddenContrasena2"
                  onMouseOut={handlePassword}
                />
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
            type={RepassType}
            placeholder="Confirmar contraseña"
            onChange={handleChange}
            value={values.repeatPassword}
          />
          <div className="absolute w-12 h-12 flex justify-center items-center right-0 text-primary-400">
            {
              RepassType === 'password' ?
                <img id="reeyepass" className="w-8 h-8 " src={eyesOff} alt="showContrasena"
                  onMouseEnter={handlePassword}
                />
                :
                <img id="reeyepass2" className="w-8 h-8 " src={eyesOn} alt="hiddenContrasena"
                  onMouseOut={handlePassword}
                />
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
              checked={true}
            />
            <p className="font-light text-lg">Aceptos los <strong className=" font-bold text-primary-700 underline">
              Términos y Condiciones y
              Políticas de privacidad
            </strong>
            </p>
          </div>

        </div>

        <button type="submit"
          className="bg-primary-300  text-white w-[328px] h-12 p-2 rounded-lg mt-4">
          Registrarme
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
