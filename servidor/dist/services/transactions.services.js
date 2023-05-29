"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fecthDepositStripe = exports.fecthGetTransfer = exports.fecthTransfer = exports.fecthVerifyAccount = void 0;
const transactions_models_1 = __importDefault(require("../models/transactions.models"));
const users_models_1 = __importDefault(require("../models/users.models"));
// verify receiver's account number
const fecthVerifyAccount = async (transaction) => {
    try {
        const { receiver } = transaction;
        const user = await users_models_1.default.findOne({ _id: receiver });
        if (!user) {
            throw new Error('Account not found');
        }
        return user;
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.fecthVerifyAccount = fecthVerifyAccount;
// transfer money from one account to another
const fecthTransfer = async (transaction) => {
    try {
        const { receiver, sender, amount } = transaction;
        // save the transaction
        const newTransaction = await transactions_models_1.default.create(transaction);
        // decrease the sender's balance
        await users_models_1.default.findByIdAndUpdate(sender, {
            $inc: { balance: -amount }
        });
        // increase the receiver balance
        await users_models_1.default.findByIdAndUpdate(receiver, {
            $inc: { balance: amount }
        });
        return newTransaction;
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.fecthTransfer = fecthTransfer;
// get all transactions for a user
const fecthGetTransfer = async (id) => {
    try {
        const user = await users_models_1.default.findById(id);
        if (!user) {
            throw new Error('Account not found');
        }
        const transaction = await transactions_models_1.default.find({
            $or: [{ sender: id }, { receiver: id }]
        })
            .sort({ createdAt: -1 })
            .populate('sender')
            .populate('receiver');
        const filterTrans = transaction.map(trans => {
            if (trans.sender._id.equals(trans.receiver._id)) {
                trans.transaction_type = 'deposit';
            }
            else if (trans.sender._id.equals(user._id)) {
                trans.transaction_type = 'debit';
            }
            else {
                trans.transaction_type = 'credit';
            }
            return trans;
        });
        return filterTrans;
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.fecthGetTransfer = fecthGetTransfer;
// deposit funds using stripe
const fecthDepositStripe = async () => {
    try {
        console.log('API INTEGRATION DEPOSIT');
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.fecthDepositStripe = fecthDepositStripe;
