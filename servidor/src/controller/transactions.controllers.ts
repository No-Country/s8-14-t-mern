import { Request, Response } from 'express'
import {
  fecthDepositStripe,
  fecthGetTransfer,
  fecthTransfer,
  fecthVerifyAccount
} from '../services/transactions.services'

/**
 * Controlador para manejar las operaciones relacionadas con los usuarios.
 *
 */
const postVeryfyController = async (req: Request, res: Response) => {
  try {
    /*  const { receiver, alias } = req.body
    if (!alias || !receiver) {
      res.status(401).json({
        msg: 'Not data provided',
        data: null,
        success: false
      })
    }
    const data = await fecthVerifyAccount(receiver, alias) */
    const { alias } = req.body
    if (!alias) {
      res.status(401).json({
        msg: 'Not alias provided',
        data: null,
        success: false
      })
    }
    const data = await fecthVerifyAccount(alias)
    res
      .status(201)
      .json({ msg: 'Account verified successfully', data, success: true })
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

const postTransferController = async (req: Request, res: Response) => {
  try {
    const { amount, sender, receiver } = req.body
    if (!amount || !sender || !receiver) {
      res.status(401).json({
        msg: 'Not data provided',
        data: [],
        success: false
      })
    }
    const newTransaction = await fecthTransfer(req.body)
    res.status(201).json({
      msg: 'Transaction successfully',
      data: newTransaction || null,
      success: true
    })
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

const getTransactionsController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const transactions = await fecthGetTransfer(id)
    res
      .status(201)
      .json({ msg: 'Transactions by User', data: transactions, success: true })
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

const postDepositStripeCtrl = async (req: Request, res: Response) => {
  try {
    const { token, amount, id } = req.body
    const deposit = await fecthDepositStripe(token, amount, id)
    res
      .status(201)
      .json({ msg: 'Stripe deposit successful', data: deposit, success: true })
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

export {
  getTransactionsController,
  postDepositStripeCtrl,
  postTransferController,
  postVeryfyController
}
