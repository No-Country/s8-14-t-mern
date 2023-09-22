import { Document, Types } from 'mongoose'

export interface ITopUpCard extends Document {
  cardOfUserId: Types.ObjectId
  amount: number
  userId: Types.ObjectId
}
