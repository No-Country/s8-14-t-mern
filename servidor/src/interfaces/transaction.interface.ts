import { Document, Types } from 'mongoose'

export interface ITransactions extends Document {
    amount:number
    sender:Types.ObjectId
    receiver:Types.ObjectId
    reference:string
    status:string
}