"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'pigmeo123';
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// decode token
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log('HEADER', authHeader);
        if (authHeader && authHeader !== 'null') {
            const token = authHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, secretKey, (err) => {
                if (err) {
                    return res
                        .status(403)
                        .send({ success: false, message: 'Token Expired' });
                }
                next();
            });
        }
        else {
            res.status(403).json({ success: false, message: 'UnAuthorized' });
        }
    }
    catch (error) {
        res.send({
            message: 'error',
            success: false
        });
    }
};
exports.verifyToken = verifyToken;
