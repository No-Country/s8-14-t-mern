"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsController = exports.postTransferController = exports.postVeryfyController = void 0;
const transactions_services_1 = require("../services/transactions.services");
const postVeryfyController = async (req, res) => {
    try {
        const data = await (0, transactions_services_1.fecthVerifyAccount)(req.body);
        res
            .status(201)
            .json({ msg: 'Account verified successfully', data, success: true });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.postVeryfyController = postVeryfyController;
const postTransferController = async (req, res) => {
    try {
        const newTransaction = await (0, transactions_services_1.fecthTransfer)(req.body);
        res
            .status(201)
            .json({
            msg: 'Transaction successfully',
            data: newTransaction,
            success: true
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.postTransferController = postTransferController;
const getTransactionsController = async (req, res) => {
    try {
        const { id } = req.params;
        const transactions = await (0, transactions_services_1.fecthGetTransfer)(id);
        res
            .status(201)
            .json({ msg: 'Transactions by User', data: transactions, success: true });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getTransactionsController = getTransactionsController;
