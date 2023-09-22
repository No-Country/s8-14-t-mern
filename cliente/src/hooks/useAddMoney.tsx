import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserData } from '@/context/UserContext';
import { stripeTransaction } from '@/services/transactions';
import { Token } from 'react-stripe-checkout';

export default function useAddMoney() {
  const { user } = useUserData();
  const [monto, setMonto] = useState<any>(0);

  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMonto(event.target.value);
  };

  const onToken = async (token: Token) => {
    try {
      const response = await stripeTransaction(
        {
          token,
          amount: monto,
          id: user.id
        }
      )
      if (response) {
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    monto,
    setMonto,
    onToken,
    handleChange
  }

}
