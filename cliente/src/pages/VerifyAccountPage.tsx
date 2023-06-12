import { ReactElement, FormEvent, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Metric, Text, Button } from "@tremor/react";
import toast from "react-hot-toast";

import apiUsers from "@/services/users";

function VerifyAccount(): ReactElement {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const { token } = useParams() as { token: string };

  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        const response = await apiUsers.activateUserAccount(token);
        console.log(response);
        setIsTokenValid(true);
        toast.success(
          response?.data?.msg || "Cuenta de usuario verificado correctamente"
        );
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data || "Link no valido");
      }
    })();
  }, []);

  return (
    <main className="w-full h-screen grid place-items-center px-5">
      Activar Cuenta de usuario
      {isTokenValid && (
        <Card className="max-w-sm flex flex-col gap-7">
          Cuenta Verificada
          <Link to="/auth/login">Iniciar Sesión</Link>
        </Card>
      )}
    </main>
  );
}

export default VerifyAccount;
