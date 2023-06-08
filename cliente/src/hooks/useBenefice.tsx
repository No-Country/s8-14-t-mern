import { getBenefices } from '@/services/benefices';
import { getBenefice, getBeneficesByCategory } from '@/services/benefices';
import React, { useState } from 'react';

export interface Benefice {
  name: string;
  category: string;
  typeBenefice: string;
  theBest: boolean;
  description: string;
  image_1?: string;
  image_2?: string;
  image_3?: string;
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
  const [TheBests, setTheBests] = useState<Benefice[]>();
  const [Benefice, setBenefice] = useState<Benefice>();

  const getBestBenefits = async () => {
    const { data: { data } } = await getBenefices();
    const theBests = data.filter((benefice: Benefice) => benefice.theBest === true);
    setTheBests(theBests)
  }

  const getBeneficeByID = async (id: string) => {
    const { data: { data } } = await getBenefice(id);
    setBenefice(data)
  }

  const handdleCategory = async (category: string): Promise<void> => {
    const { data: { data } } = await getBeneficesByCategory(category);
    console.log(data);

    // if (data.length !== 0) {
    const theBest = data.filter((benefice: Benefice) => benefice.theBest === true);
    const descount = data.filter((benefice: Benefice) => benefice.typeBenefice === 'descuentos' && benefice.theBest == false);
    const refound = data.filter((benefice: Benefice) => benefice.typeBenefice === 'reintegros' && benefice.theBest == false);

    setRefound(refound);
    setDescount(descount);
    setTheBest(theBest);
    // }
  };

  return {
    //method
    handdleCategory,
    getBestBenefits,
    getBeneficeByID,
    // property
    Benefice,
    Refound,
    Descount,
    TheBest,
    TheBests
  };
}
