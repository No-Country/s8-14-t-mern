import { ICard } from "../interfaces/card.interface"
import Card from "../models/cards.models"

const fetchPost = async (card: ICard) => {
  try {
    const newCard = await Card.create(card)
    return newCard
  } catch (e) {
    throw new Error(e as string)
  }
}

const fetchGet = async () => {
  try {
    const card = await Card.find({})
    return card
  } catch (e) {
    throw new Error(e as string) 
  }
}

const findCardType = async (data: string) => {
  try {
    const card = await Card.findOne({ data })
    return card 
  } catch (e) {
    throw new Error(e as string) 
  }
}

export {
  fetchPost,
  fetchGet,
  findCardType
}