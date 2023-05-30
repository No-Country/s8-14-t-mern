/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserAccount } from "@/types";

export interface ITransactions {
  amount: number;
  sender: string | null;
  receiver: any;
  reference: string | null;
}
const userContextInitialState = {
  setTransferData: () => {},
};
interface UserContextType {
  transferData?: ITransactions;
  setTransferData: React.Dispatch<React.SetStateAction<ITransactions>>;
}

const USER_INITIAL_STATE: ITransactions = {
  amount: 0,
  sender: null,
  receiver: null,
  reference: null,
};

const NewTransferContext = createContext<UserContextType>(
  userContextInitialState
);

function useNewTranferData() {
  const context = useContext(NewTransferContext);
  return context;
}

function NewTransferProvider() {
  const [transferData, setTransferData] = useState(USER_INITIAL_STATE);

  return (
    <NewTransferContext.Provider value={{ transferData, setTransferData }}>
      <Outlet />
    </NewTransferContext.Provider>
  );
}
export { NewTransferContext, NewTransferProvider, useNewTranferData };
