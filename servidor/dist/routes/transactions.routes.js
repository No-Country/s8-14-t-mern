"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const transactions_controllers_1 = require("../controller/transactions.controllers");
const router = (0, express_1.Router)();
exports.router = router;
// verify receiver's account number
router.post('/verify-account', transactions_controllers_1.postVeryfyController);
// Transfer money from one account to another
router.post('/transfer-funds', transactions_controllers_1.postTransferController);
// get all transactions for a user
router.get('/get-all-transactions-by-user/:id', 
// verifyToken,
transactions_controllers_1.getTransactionsController);
