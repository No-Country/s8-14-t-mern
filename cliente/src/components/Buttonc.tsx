import React, { ReactNode } from 'react';
import { Button, Grid } from "@tremor/react";
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
  styled: boolean
  action?: string
  href?: string
}
const Buttonc: React.FC<Props> = ({ children, styled, action, href }) => {

  const navigate = useNavigate();

  function OnHanddleAction() {
    switch (action) {
      case "transferir":
        // Realizar peticion al back 
        // Luego re-dirigir a la responsePage.tsx
        if (href) {
          navigate(href);
        }
        break;
      case "volver":
        if (href) {
          navigate(href);
        }
        break;
      case "continuar":
        if (href) {
          navigate(href);
        }
        break;
      case "recargar":
        break;
      default:
        if (href) {
          navigate(href);
        }
        break;
    }

  }

  return (
    <Grid
      className='w-full flex justify-center my-4'
    >
      <Button className={`${styled ? "w-80 h-11 rounded-3xl bg-primary border-bg-primary hover:bg-primary-700" : "w-80 h-11 rounded-3xl bg-transparent border-0 text-black hover:bg-transparent cursor-pointer shadow-none"}`}
        onClick={OnHanddleAction}
      >
        {children}
      </Button >
    </Grid>
  );
}

export default Buttonc;