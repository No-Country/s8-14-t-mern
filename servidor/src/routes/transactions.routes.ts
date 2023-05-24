import { Router } from 'express'
import { verifyToken } from '../middlewares/authMiddleware'
import {
  postVeryfyController,
  postTransferController,
  getTransactionsController,
  postDepositStripeCtrl
} from '../controller/transactions.controllers'

const router = Router()

// verify receiver's account number

router.post('/verify-account', postVeryfyController)

// Transfer money from one account to another
// https://blog.apilayer.com/7-best-free-currency-converter-apis-in-2023/

router.post('/transfer-funds', postTransferController)

// get all transactions for a user

router.get('/get-all-transactions-by-user/:id', getTransactionsController)

// deposit funds using stripe

router.post('/deposit-funds-stripe', postDepositStripeCtrl)

export { router }
