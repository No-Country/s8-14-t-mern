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
}

export interface ITransactions {
  amount: number;
  sender: string;
  receiver: string;
  reference: string;
  transaction_type: string;
  status: string;
}
