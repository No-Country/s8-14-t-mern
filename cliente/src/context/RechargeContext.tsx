import React, { createContext, useState, ReactNode } from "react";

interface CardContextProps {
  cardId: string | null;
  setCardId: (id: string | null) => void;
  rechargeId: string | null;
  setRechargeId: (id: string | null) => void;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  handleCardClick: (cardId: string, cardImage: string, cardName: string) => void;
  selectName:string | null
  amountUser:number |null
  setAmountUser: (amount: number) => void
  catchNumberCard: number | null
  setCatchNumberCard:(numberCard: number) => void
}

export const RechargeContext = createContext<CardContextProps>({
  cardId: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCardId: () => {},
  rechargeId: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRechargeId: () => {},
  selectedImage: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedImage: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleCardClick: () => {},
 selectName:null,
 amountUser: null,
 // eslint-disable-next-line @typescript-eslint/no-empty-function
 setAmountUser: ( ) => {},
 catchNumberCard: null,
 // eslint-disable-next-line @typescript-eslint/no-empty-function
 setCatchNumberCard:()=> {}
});

export const RechargeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cardId, setCardId] = useState<string | null>(null);
  const [rechargeId, setRechargeId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const[selectName, setSelectName] = useState<string | null>(null);
  const[amountUser, setAmountUser] = useState<number | null>(null);
  const[catchNumberCard, setCatchNumberCard] = useState<number | null>(null);
  const handleCardClick = (id: string, cardImage:string, cardName:string ) => {
    setCardId(id)
    setSelectedImage(cardImage)
    setSelectName(cardName)
  };

  return (
    <RechargeContext.Provider value={{ 
      cardId, 
      setCardId,
      rechargeId,
      setRechargeId,
      selectedImage,
      setSelectedImage,
      handleCardClick,
      selectName,
      amountUser,
      setAmountUser,
      catchNumberCard,
      setCatchNumberCard
     }}>
      {children}
    </RechargeContext.Provider>
  );
};

