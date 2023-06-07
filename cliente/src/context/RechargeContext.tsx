import React, { createContext, useState, ReactNode } from "react";

interface CardContextProps {
  cardId: string | null;
  setCardId: (id: string | null) => void;
  rechargeId: string | null;
  setRechargeId: (id: string | null) => void;
}

export const RechargeContext = createContext<CardContextProps>({
  cardId: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCardId: () => {},
  rechargeId: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRechargeId: () => {},
});

export const RechargeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cardId, setCardId] = useState<string | null>(null);
  const [rechargeId, setRechargeId] = useState<string | null>(null);

  const handleCardClick = (id: string | null) => {
    setCardId(id);
  };

  return (
    <RechargeContext.Provider value={{ cardId, setCardId: handleCardClick,rechargeId,setRechargeId }}>
      {children}
    </RechargeContext.Provider>
  );
};

