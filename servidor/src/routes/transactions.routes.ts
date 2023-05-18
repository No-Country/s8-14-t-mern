import { Router } from 'express'
import { getIdUser } from '../middlewares/authMiddleware'
import { postVeryfyController, postTransferController, getTransactionsController } from '../controller/transactions.controllers'

const router = Router();

// verify receiver's account number

router.post("/verify-account", postVeryfyController);

// Transfer money from one account to another

router.post("/transfer-funds", postTransferController);

// get all transactions for a user

router.get("/get-all-transactions-by-user",getIdUser, getTransactionsController);

export { router }  