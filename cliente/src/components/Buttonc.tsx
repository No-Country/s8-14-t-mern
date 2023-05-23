import React, { ReactNode } from 'react';
import { Button, Grid } from "@tremor/react";

interface Props {
  children: ReactNode;
  styled: boolean
  action: string
}
const Buttonc: React.FC<Props> = ({ children, styled, action }) => {

  function OnHanddleAction() {
    switch (action) {
      case "transferir":
        break;
      case "volver":
        break;
      case "continuar":
        break;
      case "recargar":
        break;
      default:
        //accion cancelar
        break;
    }

  }

  return (
    <Grid
      className='w-full flex justify-center my-4'
    >
      <Button className={`${styled ? "w-80 h-11 rounded-3xl" : "w-auto h-14 bg-transparent border-0 text-black hover:bg-transparent cursor-pointer"}`}
        onClick={OnHanddleAction}
      >
        {children}
      </Button >
    </Grid>
  );
}

export default Buttonc;