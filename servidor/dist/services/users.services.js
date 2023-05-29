"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUpdate = exports.fetchLogin = exports.fetchPost = exports.fetchPut = exports.fetchUserId = exports.fetchGet = void 0;
const users_models_1 = __importDefault(require("../models/users.models"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'pigmeo123';
const fetchGet = async () => {
    try {
        const users = await users_models_1.default.find({});
        if (users) {
            return users;
        }
    }
    catch (error) {
        throw new Error('error');
    }
};
exports.fetchGet = fetchGet;
const fetchUserId = async (id) => {
    try {
        const userId = await users_models_1.default.findById(id);
        console.log(userId);
        if (userId) {
            return userId;
        }
    }
    catch (error) {
        throw new Error('error');
    }
};
exports.fetchUserId = fetchUserId;
const fetchPut = async (user) => {
    try {
        // const userMatch = await User.find({ _id: user._id })
        // if (userMatch.length){
        // const firstName =
        //   user.firstName !== '' ? user.firstName : userMatch.firstName
        // const lastname = user.lastname !== '' ? user.lastname : userMatch.lastname
        // const typeIdentification =
        //   user.typeIdentification !== ''
        //     ? user.typeIdentification
        //     : userMatch.typeIdentification
        // const alias = user.alias !== '' ? user.alias : userMatch.alias
        // const phoneNumber =
        //   user.phoneNumber !== '' ? user.phoneNumber : userMatch.phoneNumber
        // const email = user.email !== '' ? user.email : userMatch.email
        // const address = user.address !== '' ? user.address : userMatch.address
        // const avatar = user.avatar !== '' ? user.avatar : userMatch.avatar
        // const password = user.password !== '' ? user.password : userMatch.password
        // const balance = user.balance !== '' ? user.balance : userMatch.balance
        // const isActive = user.isActive !== '' ? user.isActive : userMatch.isActive
        // const rol = user.rol !== '' ? user.rol : userMatch.rol
        // const token = user.token !== '' ? user.token : userMatch.token
        //   const resp = await User.findByIdAndUpdate(
        //     user.id,
        //     {
        //       $set: {
        //         firstName,
        //         lastname,
        //         typeIdentification,
        //         alias,
        //         phoneNumber,
        //         email,
        //         address,
        //         avatar,
        //         password,
        //         balance,
        //         isActive,
        //         rol,
        //         token
        //       }
        //     },
        //     { new: true }
        //   )
        //   return {
        //     error: false,
        //     data: resp
        //   }
        // }
    }
    catch (error) {
        console.log(error);
        return { data: error };
    }
};
exports.fetchPut = fetchPut;
const fetchPost = async (user) => {
    const { password, repeatPassword } = user;
    if (password !== repeatPassword) {
        return 'password not match';
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const passwordHash = await bcryptjs_1.default.hash(password, salt);
    try {
        const newUser = await users_models_1.default.create({ ...user, password: passwordHash });
        // const { password, ...rest } = newUser
        const userModify = {
            id: newUser.id,
            firstName: newUser.firstName,
            lastname: newUser.lastname,
            email: newUser.email,
            avatar: newUser.avatar,
            balance: newUser.balance,
            token: newUser.token,
            alias: newUser.alias
        };
        return userModify;
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.fetchPost = fetchPost;
const fetchUpdate = async (id, data) => {
    try {
        const user = await users_models_1.default.findById(id);
        if (!user) {
            throw new Error(`User with id: ${id} does not exist`);
        }
        Object.assign(user, data);
        const userModified = await user.save();
        return userModified;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.fetchUpdate = fetchUpdate;
const fetchLogin = async (password, email) => {
    try {
        if (!email || !password) {
            throw new Error('mandatory data are missing');
        }
        const user = await users_models_1.default.findOne({ email });
        if (!user) {
            return 'user not found';
        }
        const comparaPass = await bcryptjs_1.default.compare(password, user.password);
        if (!comparaPass) {
            throw new Error('invalid email or password');
        }
        const token = jsonwebtoken_1.default.sign({
            email: user.email,
            id: user.id
        }, secretKey, {
            expiresIn: '1d'
        });
        const response = {
            email: user.email,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastname,
            alias: user.alias,
            token
        };
        return response;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.fetchLogin = fetchLogin;
