import { ReactElement, FormEvent, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, Metric, Text, Button } from "@tremor/react";
import toast from "react-hot-toast";

import apiUsers from "@/services/users";

function ResetPassword(): ReactElement {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const { token } = useParams() as { token: string };
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        await apiUsers.checkNewPasswordToken(token);
        setIsTokenValid(true);
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data || "Link no valido");
      }
    })();
  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const password = formData.get("password") as string;
    try {
      const payload = { password, token };
      const response = await apiUsers.changePassword(payload);
      console.log(response);
      toast.success(response?.data?.msg || "Cambio de contraseña exitoso");
      navigate("/auth/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data || "Error al cambiar contraseña");
    }
  };
  return (
    <main className="w-full h-screen grid place-items-center px-5">
      {isTokenValid && (
        <Card className="max-w-sm flex flex-col gap-7">
          <Metric>
            <Link to="/">Nueva Contraseña</Link>
          </Metric>
          <Text>Ingresa tu nueva contraseña</Text>
          <form onSubmit={submitHandler}>
            <input
              type="password"
              name="password"
              placeholder="contraseña"
              required
              className="w-full border p-1 rounded"
            />
            <Button className="w-full mt-7">Continuar</Button>
          </form>
        </Card>
      )}
    </main>
  );
}

export default ResetPassword;
