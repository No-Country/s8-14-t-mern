export interface UserAccount {
  firstName: string;
  lastname: string;
  email: string;
  avatar: string;
  password: string;
  balance: number;
  isActive: boolean;
  rol: "admin" | "user";
  token: string;
  alias: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface IUser extends UserAccount {
  alias: string;
  avatar: string;
  phoneNumber: string;
  typeIdentification: "dni" | "cedula" | "pasaporte";
  numberIdentification: number;
  address: string;
  country: string;
  city: string;
}

export interface ITransactions {
  amount: number;
  sender: UserAccount;
  receiver: UserAccount;
  reference: string;
  transaction_type: "deposit" | "debit" | "credit";
  status: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
