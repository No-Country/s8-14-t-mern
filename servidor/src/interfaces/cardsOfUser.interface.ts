import { Request } from 'express'
import { Document, Types } from 'mongoose'

export interface ICardsOfUser extends Document {
  balanceCard: number
  cardOptions: Types.ObjectId
  numberCard: number
  userId: Types.ObjectId
}

export interface CardsOfUserRequestI extends Request {
  cardsOfUser?: ICardsOfUser
}
