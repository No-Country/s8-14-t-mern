import axios from "./config";

export function verifyCBU(cbu: string) {
  const payload = {
    receiver: cbu,
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
  token: string;
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
  verifyCBU,
  transferFunds,
  getUserTransactions,
  stripeTransaction,
};
