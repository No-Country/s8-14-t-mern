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
  transaction_type: string;
  status: string;
}
export function transferFunds(payload: TransferFunds) {
  return axios.post(`/transactions/transfer-funds`, payload);
}
export function getUserTransactions(userId: string | undefined) {
  return axios.get(`/transactions/get-all-transactions-by-user/${userId}`);
}

export default {
  verifyCBU,
  transferFunds,
  getUserTransactions,
};
