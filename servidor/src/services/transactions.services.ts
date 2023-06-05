import { config } from 'dotenv'
import { Types } from 'mongoose'
import Stripe from 'stripe'
import { v4 as uuidv4 } from 'uuid'
import { ITransactions } from '../interfaces/transaction.interface'
import Transaction from '../models/transactions.models'
import User from '../models/users.models'

config()
const stripeSecretKey = process.env.STRIPE_KEY
const ObjectId = Types.ObjectId

// Validator function

const isValidObjectId = (id: any) => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true
    return false
  }
  return false
}

// verify receiver's account number

/* const fecthVerifyAccount = async (receiver: any, alias: any) => {
  try {
    if (!isValidObjectId(receiver)) {
      throw new Error('Is not a valid MongodbID')
    }
    const user = await User.findOne({ $and: [{ _id: receiver }, { alias }] })
    if (!user) {
      throw new Error('Account not found')
    }
    const filterUser = {
      firstName: user.firstName,
      lastName: user.lastname,
      avatar: user.avatar,
      alias: user.alias
    }
    return filterUser
  } catch (e) {
    throw new Error(e as string)
  }
} */
const fecthVerifyAccount = async (alias: any) => {
  try {
    const user = await User.findOne({ alias })
    if (!user) {
      throw new Error('Account not found')
    }
    const filterUser = {
      firstName: user.firstName,
      lastName: user.lastname,
      avatar: user.avatar,
      alias: user.alias
    }
    return filterUser
  } catch (e) {
    throw new Error(e as string)
  }
}

// transfer money from one account to another

const fecthTransfer = async (transaction: ITransactions) => {
  try {
    const { receiver, sender, amount } = transaction
    const user = await User.findById(sender)
    if (user?.balance !== undefined) {
      if (user.balance <= amount) {
        throw new Error('Insufficient balance')
      } else {
        if (receiver === sender) {
          throw new Error('Try to another receiver account')
        }
        // save the transaction
        const newTransaction = await Transaction.create(transaction)
        // show receiver info
        const newTransactionPop = await Transaction.findById(
          newTransaction._id
        ).populate(
          'receiver',
          '-token -rol -createdAt -updatedAt -password -isActive -balance -benefices -topUpCard'
        )
        // decrease the sender's balance
        await User.findByIdAndUpdate(sender, {
          $inc: { balance: -amount }
        })
        // increase the receiver balance
        await User.findByIdAndUpdate(receiver, {
          $inc: { balance: amount }
        })
        return newTransactionPop
      }
    }
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
      .populate(
        'sender',
        '-token -rol -createdAt -updatedAt -password -isActive -balance'
      )
      .populate(
        'receiver',
        '-token -rol -createdAt -updatedAt -password -isActive -balance'
      )

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

const fecthDepositStripe = async (token: any, amount: any, id: any) => {
  try {
    const stripe = new Stripe(stripeSecretKey!, {
      apiVersion: '2022-11-15'
    })
    // create customer

    const params: Stripe.CustomerCreateParams = {
      description: 'test customer',
      email: token.email,
      source: token.id
    }

    const customer: Stripe.Customer = await stripe.customers.create(params)

    // create charge

    const charge: Stripe.Charge = await stripe.charges.create(
      {
        amount: amount * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Deposited to my pigmeo account`
      },
      {
        idempotencyKey: uuidv4()
      }
    )

    // save the transaction on db

    if (charge.status === 'succeeded') {
      const transObject = {
        sender: id,
        receiver: id,
        amount,
        transaction_type: 'deposit',
        reference: 'stripe deposit',
        status: 'success'
      }
      const newTransaction = await Transaction.create(transObject)

      // increase the users's balance

      await User.findByIdAndUpdate(id, {
        $inc: { balance: amount }
      })
      return newTransaction
    } else {
      return { message: 'Transaction failed', charge: charge }
    }
  } catch (e) {
    throw new Error(e as string)
  }
}

export {
  fecthDepositStripe,
  fecthGetTransfer,
  fecthTransfer,
  fecthVerifyAccount
}
