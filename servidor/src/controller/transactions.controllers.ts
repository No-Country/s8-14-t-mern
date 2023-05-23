import { Request, Response } from 'express'
import {
  fecthGetTransfer,
  fecthTransfer,
  fecthVerifyAccount
} from '../services/transactions.services'

/**
 * Controlador para manejar las operaciones relacionadas con los usuarios.
 */

const postVeryfyController = async (req: Request, res: Response) => {
  try {
    const data = await fecthVerifyAccount(req.body)
    res
      .status(201)
      .json({ msg: 'Account verified successfully', data, success: true })
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
}

const postTransferController = async (req: Request, res: Response) => {
  try {
    const newTransaction = await fecthTransfer(req.body)
    res.status(201).json({
      msg: 'Transaction successfully',
      data: newTransaction,
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

export {
  getTransactionsController,
  postTransferController,
  postVeryfyController
}
