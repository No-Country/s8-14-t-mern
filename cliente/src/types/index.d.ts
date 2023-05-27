export interface IUser {
  firstName: string;
  lastname: string;
  alias: string;
  avatar: string;
  phoneNumber: string;
  email: string;
  typeIdentification: "dni" | "cedula" | "pasaporte";
  numberIdentification: number;
  address: string;
  country: string;
  city: string;
  password: string;
  repeatPassword: string;
  balance: number;
  isActive: boolean;
  rol: "admin" | "user";
  token: string;
  id: string;
}

export type ITransactions = {
  amount: number;
  sender: UserAccount;
  receiver: UserAccount;
  reference: string;
  transaction_type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export type UserAccount = {
  firstName: string;
  lastname: string;
  email: string;
  avatar: string;
  password: string;
  balance: number;
  isActive: boolean;
  rol: string;
  token: string;
  alias: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
