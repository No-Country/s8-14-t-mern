// eslint-disable-next-line simple-import-sort/imports
import { Schema, model } from 'mongoose'
import { ITransactions } from '../interfaces/transaction.interface'

const transactionSchema = new Schema<ITransactions>(
  {
    amount: {
      type: Number,
      required: true
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reference: {
      type: String,
      required: true
    },
    transaction_type: {
      type: String,
      default: null
    },
    status: {
      type: String,
      default: 'success'
    }
  },
  { timestamps: true }
)

transactionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Transaction = model<ITransactions>('Transaction', transactionSchema)

export default Transaction
