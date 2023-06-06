import React, { useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import apiUsers from "@/services/users";
import toast from "react-hot-toast";

export default function useRegister() {
  const [passType, setpassType] = useState('password');
  const [RepassType, setRepassType] = useState('password');

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      firstName: "",
      lastname: "",
      email: "",
      password: "",
      repeatPassword: "",
      aceptarTerminos: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Nombre de usuario requerido"),
      lastname: Yup.string().required("Apellido es requerido"),
      email: Yup.string()
        .email("Ingresar un email válido")
        .required("Email es requerido")
        .max(50),
      password: Yup.string()
        .required("Contraseña es requerida")
        .min(8, "Contraseña debe contener al menos 8 caracteres")
        .matches(/[A-Z]/, "Contraseña debe contener al menos una mayúscula")
        .matches(/[a-z]/, "Contraseña debe contener al menos una minúscula")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Contraseña debe contener al menos un carácter especial"
        ),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
        .required("Confirmar contraseña es requerida"),
      aceptarTerminos: Yup.boolean()
        .oneOf([true], "Debes aceptar los términos y condiciones antes de continuar")
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

  const handlePassword = (event: React.MouseEvent<HTMLImageElement>) => {
    if (event.currentTarget.id === "eyepass" && event.type === "mouseenter"
      || event.currentTarget.id === "eyepass2" && event.type === "mouseout") {
      setpassType((prevType) => (prevType === "password" ? "text" : "password"));
    }
    if (event.currentTarget.id == "reeyepass" && event.type === "mouseenter" ||
      event.currentTarget.id == "reeyepass2" && event.type === "mouseout") {
      setRepassType((prevType) => (prevType === "password" ? "text" : "password"));
    }
  };


  return {
    //properties
    values,
    errors,
    touched,
    RepassType,
    passType,
    // method
    handleChange,
    handleSubmit,
    handlePassword
  }
}
