import { ITransactions } from '../interfaces/transaction.interface'
import Transaction from '../models/transactions.models'
import User from '../models/users.models'
import { config } from 'dotenv'
import Stripe from 'stripe'
import { v4 as uuidv4 } from 'uuid'

config()
const stripeSecretKey = process.env.STRIPE_KEY

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
    const user = await User.findById(sender)
    if (user?.balance !== undefined) {
      if (user.balance <= amount) {
        throw new Error('Insufficient balance')
      } else {
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
      .populate('sender','-token -rol -createdAt -updatedAt -password -isActive -balance')
      .populate('receiver','-token -rol -createdAt -updatedAt -password -isActive -balance')
    return transaction
  } catch (e) {
    throw new Error(e as string)
  }
}

// deposit funds using stripe

const fecthDepositStripe = async (token: any, amount: any, id: any) => {
  try {
    console.log('API INTEGRATION DEPOSIT')
    console.log('Amount ', amount)
    console.log('Token ', token)
    const stripe = new Stripe(stripeSecretKey!, {
      apiVersion: '2022-11-15'
    })
    console.log(stripe)
    // Create customer

    const params: Stripe.CustomerCreateParams = {
      description: 'test customer',
      email: token.email,
      source: token.id
    }

    const customer: Stripe.Customer = await stripe.customers.create(params)
    console.log('Customer ', customer)

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
    console.log('Charge ', charge)

    // Save the transaction on db

    if (charge.status === 'succeeded') {
      const transObject = {
        sender: id,
        receiver: id,
        amount,
        transaction_type: 'deposit',
        reference: 'stripe pigmeo deposit',
        status: 'success'
      }
      const newTransaction = await Transaction.create(transObject)

      // Increase the users's balance

      await User.findByIdAndUpdate(id, {
        $inc: { balance: amount }
      })
      console.log('DEPOSIT TRANSACTION ', newTransaction)
      return newTransaction
    } else {
      return { message: 'Transaction failed', charge: charge }
    }
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
