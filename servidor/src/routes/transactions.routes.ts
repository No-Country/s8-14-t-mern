import { Router } from 'express'
import {
  getTransactionsController,
  postDepositStripeCtrl,
  postTransferController,
  postVeryfyController
} from '../controller/transactions.controllers'
import {
  validatorDepositTrns,
  validatorTransferFundsTrns,
  validatorVerifyAccountTrns
} from '../middlewares/validations'

const router = Router()

// verify receiver's account number

router.post('/verify-account', validatorVerifyAccountTrns, postVeryfyController)

// Transfer money from one account to another
// https://blog.apilayer.com/7-best-free-currency-converter-apis-in-2023/

router.post(
  '/transfer-funds',
  validatorTransferFundsTrns,
  postTransferController
)

// get all transactions for a user

router.get('/get-all-transactions-by-user/:id', getTransactionsController)

// deposit funds using stripe

router.post(
  '/deposit-funds-stripe',
  validatorDepositTrns,
  postDepositStripeCtrl
)

export { router }
