import { ReactElement, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Text, Flex } from "@tremor/react";
import HeaderBackButton from "@/components/HeaderBackButton";
import Buttonc from "@/components/Buttonc";
import { CardService } from "@/services/Recharges";
import { useUserData } from "@/context/UserContext";
import { RechargeContext } from "@/context/RechargeContext";


function RechargeAmount(): ReactElement {
  // const { imageUrl } = useParams<{ imageUrl?: string }>();
  const { user } = useUserData();
  const { rechargeId } = useContext(RechargeContext);
  
  const [moneyAmount, setMoneyAmount] = useState("");

  const handlAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMoneyAmount(event.target.value);
  };
  const handleRecharge = () => {
    CardService({
      cardOfUserId: rechargeId,
      amount: parseInt(moneyAmount),
      userId: user?.id || "",
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // if (!imageUrl) {
  //   return <div>No image selected</div>;
  // }
  return (
    <>
      <HeaderBackButton title="Recargas" />
      <Flex
        className="p-5 gap-7 h-[calc(100vh-250px)] mt-[6.75rem]"
        flexDirection="col"
        alignItems="center"
      >
        <img
          // src={decodeURIComponent(imageUrl)}
          className="w-20 h-10 rounded-full col-start-2"
        />
        <div className="w-full flex-grow flex flex-col justify-center items-center ">
          <input
            defaultValue="0,000"
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
