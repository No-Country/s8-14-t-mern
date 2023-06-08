import StripeCheckout from 'react-stripe-checkout';
import HeaderBackButton from '@/components/HeaderBackButton';
import { Grid, Title } from '@tremor/react';
import useAddMoney from '@/hooks/useAddMoney';

export default function AddMoneyPage() {
  const { monto, onToken, handleChange, setMonto } = useAddMoney()
  return (
    <>
      <HeaderBackButton title="Agregar dinero" />
      <Grid className="text-center"
        style={{ height: '100vh', width: '100%' }}>
        <Title className="text-black mt-12 ">
          Ingresá la cifra que deseas transferirte
        </Title>
        <div className='flex flex-col gap-10'>
          <input
            required
            type="number"
            name="monto"
            placeholder='Monto'
            onChange={handleChange}
            className="w-[90%] mx-auto h-20 text-center border-b-2 border-primary   text-2xl font-bold
          outline-0 focus:ring ring-primary-50 "
          />
          <div>
            < StripeCheckout
              token={onToken}
              currency="USD"
              amount={monto * 100}
              shippingAddress
              stripeKey="pk_test_51MsERVA0z17wfrUBPE1SATDMvcwgpreFXvKC8DeYJObu9WMaikTL2NLbtPX1aeJMWQQXY88V68NemhzEKqMOoiJR00BxKuX7L9"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMonto(0)}
          className="w-full h-11 rounded-3xl bg-transparent border-0 text-black hover:bg-transparent cursor-pointer shadow-none"
        >
          Cancelar
        </button>
      </Grid>
    </>
  );
}
