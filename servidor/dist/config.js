"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    port: process.env.PORT || 9000,
    nodeENV: process.env.NODE_ENV || 'development',
    database: process.env.DB_URI,
    cloudinary: process.env.CLOUDINARY_URL,
    corsOptions: {
        origin: '*',
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 204
    }
};
exports.default = config;
