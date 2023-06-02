import axios from "./config";

interface CreateBenefice {
  name: string;
  description: string;
  category: string;
  /*  discountPercentage?: number;
  cashback?: number;
  promoCode?: string;
  theBest?: boolean;
  typeBenefice?: string; */
}
export function createBenefice(benefice: CreateBenefice) {
  return axios.post(`/benefice/create`, benefice);
}
export function getBenefices() {
  return axios.get(`/benefice/all`);
}
export function getBenefice(beneficeId: string) {
  return axios.get(`/benefice/${beneficeId}`);
}
export function getBeneficesByCategory(category: string) {
  return axios.get(`/benefice/category/${category}`);
}
interface UserBeneficeHandler {
  idUser: string;
  idBenefice: string;
  active: boolean;
}

export function userBeneficeHandler(data: UserBeneficeHandler) {
  return axios.put(`/benefice/activate`, data);
}

export default {
  createBenefice,
  getBenefices,
  getBenefice,
  getBeneficesByCategory,
  userBeneficeHandler,
};
