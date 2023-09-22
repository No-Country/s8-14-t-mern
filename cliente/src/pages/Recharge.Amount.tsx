import { ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text, Flex } from "@tremor/react";
import HeaderBackButton from "@/components/HeaderBackButton";
import Buttonc from "@/components/Buttonc";
import { CardService } from "@/services/Recharges";
import { useUserData } from "@/context/UserContext";
import { RechargeContext } from "@/context/RechargeContext";
import toast from "react-hot-toast";


function RechargeAmount(): ReactElement {
  const { user } = useUserData();
  const { rechargeId, selectedImage, setAmountUser } = useContext(RechargeContext);
  const [moneyAmount, setMoneyAmount] = useState("");
  const navigate = useNavigate()

  const handlAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMoneyAmount(event.target.value);
  };
  const handleRecharge = () => {
    CardService({
      cardOfUserId: rechargeId  || "",
      amount: parseInt(moneyAmount),
      userId: user?.id || "",
    })
      .then((response) => {
        setAmountUser(response.data.amount);
        navigate("/Recharge/send");
        
      })
      .catch((error) => {
        toast.error(error.response.data.error || "Error en la recarga");
    
      });
  };
  return (
    <>
      <HeaderBackButton title="Recargas" />
      <Flex
        className="p-5 gap-7 h-[calc(100vh-250px)] mt-[6.75rem]"
        flexDirection="col"
        alignItems="center"
      >
        <img
          src={selectedImage || ""}
          className="w-20 h-10 rounded-full col-start-2"
        />
        <div className="w-full flex-grow flex flex-col justify-center items-center ">
          <input
            placeholder="Monto"
            className="text-center border-b-2 border-primary  py-5 mb-5 text-2xl font-bold
            outline-0 focus:ring ring-primary-50 "
            onChange={handlAmountChange}
          />
          <Text>Mínimo $20</Text>
        </div>
      </Flex>
      <div className="flex justify-center">
        <button
          className="bg-primary text-white w-11/12 rounded-md h-12"
          onClick={handleRecharge}
        >
          Continuar
        </button>
      </div>
      <Buttonc styled={false} href="/home">
        Cancelar
      </Buttonc>
    </>
  );
}

export default RechargeAmount;
