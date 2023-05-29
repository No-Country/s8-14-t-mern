"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const dataBase = () => {
    mongoose_1.default.set('strictQuery', false);
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    mongoose_1.default
        .connect(config_1.default?.database, options)
        .then(() => {
        console.log('Database connected');
    })
        .catch(err => {
        console.log('Database connection error', err);
    });
};
exports.default = dataBase;
