import { ICardsOfUser } from '../interfaces/cardsOfUser.interface'
import CardsOfUser from '../models/cardsOfUser.models'

const fetchCreateCard = async (card: ICardsOfUser) => {
  try {
    const newCard = await CardsOfUser.create(card)
    return newCard
  } catch (e) {
    throw new Error(e as string)
  }
}

const fetchFindAllCards = async () => {
  try {
    const cards = await CardsOfUser.find({})
    return cards
  } catch (e) {
    throw new Error(e as string)
  }
}

const fetchFindCardById = async (id: string) => {
  try {
    const card = await CardsOfUser.findById(id)
    return card
  } catch (e) {
    throw new Error(e as string)
  }
}

const fetchUpdateCard = async (id: string, data: Partial<ICardsOfUser>) => {
  try {
    const card = await CardsOfUser.findById(id)
    if (!card) {
      throw new Error(`Card with id: ${id} does not exist`)
    }

    Object.assign(card, data)
    const modifiedCard = await card.save()
    return modifiedCard
  } catch (e) {
    throw new Error(e as string)
  }
}

// const fetchDeleteCard = async () => {
//   try {
//   } catch (e) {
//     throw new Error(e as string)
//   }
// }

export {
  fetchCreateCard,
  fetchFindAllCards,
  fetchFindCardById,
  fetchUpdateCard
}
