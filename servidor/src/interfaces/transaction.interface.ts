import { Document } from 'mongoose'
import { IUser } from './user.interface'

export interface ITransactions extends Document {
  amount: number
  sender: IUser
  receiver: IUser
  reference: string
  charge: number
  transaction_type: string
  status: string
}

export interface TokenStripeDepositI {
  id: string
  email: string
}
