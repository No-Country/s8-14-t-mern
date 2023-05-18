import { Request, Response } from 'express'
import { fecthVerifyAccount, fecthTransfer, fecthGetTransfer } from '../services/transactions.services'

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
      res
        .status(201)
        .json({ msg: 'Transaction successfully', data: newTransaction, success: true })
    } catch (error) {
      if (error instanceof Error) res.status(400).json({ error: error.message })
    }
  }

const getTransactionsController = async (req: Request, res: Response) => {
    try {
        const transactions = await fecthGetTransfer();
        res
          .status(201)
          .json({ msg: 'Transactions by User', data: transactions, success: true })
      } catch (error) {
        if (error instanceof Error) res.status(400).json({ error: error.message })
      }
}

export { postVeryfyController, postTransferController, getTransactionsController }
