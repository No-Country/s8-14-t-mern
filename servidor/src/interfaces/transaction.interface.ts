import { Document, Types } from 'mongoose'

export interface ITransactions extends Document {
  amount: number
  sender: Types.ObjectId
  receiver: Types.ObjectId
  reference: string
  charge: number
  transaction_type: string
  status: string
}

export interface TokenStripeDepositI {
  id: string
  email: string
}
