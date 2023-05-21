import { ITransactions } from '../interfaces/transaction.interface'
import Transaction from '../models/transactions.models'
import User from '../models/users.models'

// verify receiver's account number

const fecthVerifyAccount = async (transaction: ITransactions) => {
  try {
    const { receiver } = transaction
    const user = await User.findOne({ _id: receiver })
    if (!user) {
      throw new Error('Account not found')
    }
    return user
  } catch (e) {
    throw new Error(e as string)
  }
}

// transfer money from one account to another

const fecthTransfer = async (transaction: ITransactions) => {
  try {
    const { receiver, sender, amount } = transaction

    // save the transaction
    const newTransaction = await Transaction.create(transaction)

    // decrease the sender's balance
    await User.findByIdAndUpdate(sender, {
      $inc: { balance: -amount }
    })

    // increase the receiver balance
    await User.findByIdAndUpdate(receiver, {
      $inc: { balance: amount }
    })

    return newTransaction
  } catch (e) {
    throw new Error(e as string)
  }
}

// get all transactions for a user

const fecthGetTransfer = async (id: any) => {
  try {
    const user = await User.findById(id)
    if (!user) {
      throw new Error('Account not found')
    }
    const transaction = await Transaction.find({
      $or: [{ sender: id }, { receiver: id }]
    })
      .sort({ createdAt: -1 })
      .populate('sender')
      .populate('receiver')
    const filterTrans = transaction.map(trans => {
      if (trans.sender._id.equals(trans.receiver._id)) {
        trans.transaction_type = 'deposit'
      } else if (trans.sender._id.equals(user._id)) {
        trans.transaction_type = 'debit'
      } else {
        trans.transaction_type = 'credit'
      }
      return trans
    })
    return filterTrans
  } catch (e) {
    throw new Error(e as string)
  }
}

// deposit funds using stripe

const fecthDepositStripe = async () => {
  try {
    console.log('API INTEGRATION DEPOSIT')
  } catch (e) {
    throw new Error(e as string)
  }
}

export {
  fecthVerifyAccount,
  fecthTransfer,
  fecthGetTransfer,
  fecthDepositStripe
}
