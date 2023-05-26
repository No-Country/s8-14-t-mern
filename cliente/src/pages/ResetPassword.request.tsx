import { ReactElement, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Card, Metric, Text, TextInput, Button } from "@tremor/react";
import toast from "react-hot-toast";

import apiUsers from "@/services/users";

function ResetPassword(): ReactElement {
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    console.log(email);
    try {
      const response = await apiUsers.requestPasswordReset(email);
      console.log(response);
      toast.success(response?.data?.msg || "Correo Enviado");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data || "Error al enviar correo");
    }
  };
  return (
    <main className="w-full h-screen grid place-items-center px-5">
      <Card className="max-w-sm flex flex-col gap-7">
        <Metric>
          <Link to="/">Pigmeo</Link>
        </Metric>
        <Text>
          Enter the email adress associate with your account and we'll send you
          a link to reset your password.
        </Text>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            name="email"
            placeholder="email"
            required
            className="w-full border p-1 rounded"
          />
          <Button className="w-full mt-7">Continuar</Button>
        </form>
      </Card>
    </main>
  );
}

export default ResetPassword;
