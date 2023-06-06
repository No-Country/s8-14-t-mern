import { Request, Response } from 'express'
import { ICardsOfUser } from '../interfaces/cardsOfUser.interface'
import {
  fetchCreateCard,
  fetchFindAllCards,
  fetchFindCardById,
  fetchUpdateCard
} from '../services/cardsOfUser.services'

const postCardOfUserCtrl = async (req: Request, res: Response) => {
  try {
    const { cardOptions, userId } = req.body

    if (!cardOptions || !userId) {
      throw new Error('This data is required: cardOptions and userId')
    }

    const newCard = await fetchCreateCard(req.body)

    res.status(201).json(newCard)
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

const getAllCardsOfUserCtrl = async (_req: Request, res: Response) => {
  try {
    const getAllCards = await fetchFindAllCards()

    res.status(200).json(getAllCards)
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

const getCardsOfUserByIdCtrl = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const getCardById = await fetchFindCardById(id)

    res.status(200).json(getCardById)
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

const patchCardsOfUserCtrl = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const { numberCard, userId, cardOptions } = req.body

    const data: Partial<ICardsOfUser> = {}
    if (numberCard) data.numberCard = numberCard
    if (cardOptions) data.cardOptions = cardOptions

    if (userId) {
      res.status(400).json({
        msg: "This data can not be edited: 'firstName' and 'lastname' "
      })
      return
    }

    const modifiedCard = await fetchUpdateCard(id, data)

    res
      .status(200)
      .json({ msg: `Card whit id: ${id} edited succesfully`, modifiedCard })
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

// const deleteCardsOfUserCtrl = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id
//   } catch (error) {
//     if (error instanceof Error) res.status(400).json({ error: error.message })
//   }
// }

export {
  getAllCardsOfUserCtrl,
  getCardsOfUserByIdCtrl,
  patchCardsOfUserCtrl,
  postCardOfUserCtrl
}
