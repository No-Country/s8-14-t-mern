import { Document, Types } from 'mongoose'

export interface ITopUpCard extends Document {
  cardId: Types.ObjectId
  amount: number
}