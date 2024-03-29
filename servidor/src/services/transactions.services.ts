import { config } from 'dotenv'
import Stripe from 'stripe'
import { v4 as uuidv4 } from 'uuid'
import {
  ITransactions,
  TokenStripeDepositI
} from '../interfaces/transaction.interface'
import Transaction from '../models/transactions.models'
import User from '../models/users.models'

config()
const stripeSecretKey = process.env.STRIPE_KEY
//Random rate ARS
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

// const ObjectId = Types.ObjectId

// Validator function

/* const isValidObjectId = (id: any) => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true
    return false
  }
  return false
} */

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
const fecthVerifyAccount = async (alias: string) => {
  try {
    //Assume that this value comes from user
    const user = await User.findOne({ alias })
    if (!user) {
      throw new Error('Account not found')
    }
    const filterUser = {
      id: user._id,
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
      if (receiver === sender) {
        throw new Error('Try to another receiver account')
      } else if (amount < 20) {
        throw new Error('Transfer minimun should be $20')
      } else if (user.balance < amount) {
        throw new Error('Insufficient balance')
      } else {
        // save the transaction
        const newTransaction = await Transaction.create(transaction)
        // show receiver info
        const newTransactionPop = await Transaction.findById(newTransaction._id)
          .populate(
            'receiver',
            '-token -rol -createdAt -updatedAt -password -isActive -balance -benefices -topUpCard'
          )
          .populate({
            path: 'sender',
            select: 'email firstName lastname'
          })
        // decrease the sender's balance
        await User.findByIdAndUpdate(sender, {
          $inc: { balance: -amount }
        })
        // increase the receiver balance
        await User.findByIdAndUpdate(receiver, {
          $inc: { balance: amount }
        })

        if (newTransactionPop) {
          const {
            amount,
            receiver: {
              firstName: nameRece,
              lastname: lastRece,
              alias,
              email: emailRece
            },
            sender: {
              email: emailSender,
              firstName: nameSender,
              lastname: lastSender
            }
          } = newTransactionPop
        }

        return newTransactionPop
      }
    }
  } catch (e) {
    throw new Error(e as string)
  }
}

// get all transactions for a user

const fecthGetTransfer = async (id: string) => {
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
const fecthDepositStripe = async (
  token: TokenStripeDepositI,
  amount: number,
  id: string
) => {
  try {
    if (!stripeSecretKey) throw new Error('stripe Key not found!.')
    const stripe = new Stripe(stripeSecretKey, {
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

    // save the transaction on db calling getRandomInt() hardCore ARS values
    const valueRate = getRandomInt(243, 246)
    if (charge.status === 'succeeded') {
      const transObject = {
        sender: id,
        receiver: id,
        amount: amount * valueRate,
        transaction_type: 'deposit',
        reference: 'stripe deposit',
        status: 'success'
      }
      const newTransaction = await Transaction.create(transObject)

      // increase the users's balance
      await User.findByIdAndUpdate(id, {
        $inc: { balance: amount * valueRate }
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
