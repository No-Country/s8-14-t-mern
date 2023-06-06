import { Token } from "react-stripe-checkout";
import axios from "./config";

export function verifyAlias(alias: string) {
  const payload = {
    alias,
  };
  return axios.post(`/transactions/verify-account`, payload);
}

export interface TransferFunds {
  amount: number;
  sender: string;
  receiver: string;
  reference: string;
}
export function transferFunds(payload: TransferFunds | any) {
  return axios.post(`/transactions/transfer-funds`, payload);
}
export function getUserTransactions(userId: string | undefined) {
  return axios.get(`/transactions/get-all-transactions-by-user/${userId}`);
}
interface stripePayload {
  token: Token;
  amount: number;
  id?: string;
}
export function stripeTransaction({ token, amount, id }: stripePayload) {
  const payload = {
    token,
    amount,
    id,
  };
  return axios.post(`/transactions/deposit-funds-stripe`, payload);
}

export default {
  verifyAlias,
  transferFunds,
  getUserTransactions,
  stripeTransaction,
};
