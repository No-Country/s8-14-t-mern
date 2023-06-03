import { useUserData } from '@/context/UserContext';
import { ChangeEvent, FormEvent, useState } from 'react';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import axios from 'axios';
import HeaderBackButton from '@/components/HeaderBackButton';

// interface StripeCheckoutProps {
//   token: (token: Token) => Promise<void>;
//   currency: string;
//   amount: number;
//   shippingAddress?: boolean;
//   stripeKey: string;
// }

export default function AddMoneyPage() {
  const { user } = useUserData();
  const [monto, setMonto] = useState<any>(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMonto(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Monto enviado:', monto);
  };

  const handleCancel = () => {
    setMonto('');
  };

  const onToken = async (token: Token) => {
    try {
      const response = await axios.post(
        'http://localhost:9000/api/v1/pigmeo/transactions/deposit-funds-stripe',
        {
          token,
          amount: monto,
          id: user.id
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeaderBackButton title="Agregar dinero" />
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="monto" className="block text-sm font-medium text-gray-700">
              Monto de dinero
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="monto"
                name="monto"
                type="text"
                value={monto}
                onChange={handleChange}
                className="mt-1 border border-gray-300 rounded-lg  
                outline-0 focus:ring-2 ring-primary w-full p-2.5"
                placeholder="Agregar monto que quieres recibir"
                required
              />

            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
          </div>

          {
            monto !== 0 &&
            < StripeCheckout
              token={onToken}
              currency="USD"
              amount={monto * 100}
              shippingAddress
              stripeKey="pk_test_51MsERVA0z17wfrUBPE1SATDMvcwgpreFXvKC8DeYJObu9WMaikTL2NLbtPX1aeJMWQQXY88V68NemhzEKqMOoiJR00BxKuX7L9"
            />
          }
        </form>
      </div>
    </>
  );
}
