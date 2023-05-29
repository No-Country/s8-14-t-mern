"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: true
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    transaction_type: {
        type: String,
        default: null
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true });
transactionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
exports.default = Transaction;
