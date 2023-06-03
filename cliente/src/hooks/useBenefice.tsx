import { getBeneficesByCategory } from '@/services/benefices';
import { type } from 'os';
import React, { useState } from 'react';

export interface Benefice {
  name: string;
  category: string;
  typeBenefice: string;
  theBest: boolean;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  discountPercentage: number;
  cashback: number;
  promoCode: string;
  id: string;
}


export default function useBenefice() {
  const [Refound, setRefound] = useState<Benefice[]>();
  const [Descount, setDescount] = useState<Benefice[]>();
  const [TheBest, setTheBest] = useState<Benefice[]>();



  const handdleCategory = async (category: string): Promise<void> => {
    const { data: { data } } = await getBeneficesByCategory(category);
    console.log(data);

    if (data.length !== 0) {
      const theBest = data.filter((benefice: Benefice) => benefice.theBest === true);
      const descount = data.filter((benefice: Benefice) => benefice.typeBenefice === 'descuentos' && benefice.theBest == false);
      const refound = data.filter((benefice: Benefice) => benefice.typeBenefice === 'reintegros' && benefice.theBest == false);

      setRefound(refound);
      setDescount(descount);
      setTheBest(theBest);
    }
  };

  return {
    //method
    handdleCategory,
    // property
    Refound,
    Descount,
    TheBest
  };
}
