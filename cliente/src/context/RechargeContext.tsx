import React, { createContext, useState, ReactNode } from "react";

interface CardContextProps {
  cardId: string | null;
  setCardId: (id: string | null) => void;
}

export const RechargeContext = createContext<CardContextProps>({
  cardId: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCardId: () => {},
});

export const RechargeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cardId, setCardId] = useState<string | null>(null);

  const handleCardClick = (id: string | null) => {
    setCardId(id);
  };

  return (
    <RechargeContext.Provider value={{ cardId, setCardId: handleCardClick }}>
      {children}
    </RechargeContext.Provider>
  );
};

