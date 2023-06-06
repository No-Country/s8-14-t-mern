import axios from "./config";

type GetCardsPayload = {
    cardType: string;
  };

export  function getCards(payload:GetCardsPayload){
return axios.get(`/cards`, {params:payload})
}
interface NumberUser {
    cardOptions: string
    numberCard: number
    userId: string
}
export  function RechargeCardNumber(payload :NumberUser){
    return axios.post(`/cardsOfUser/add-card`,payload)
}
