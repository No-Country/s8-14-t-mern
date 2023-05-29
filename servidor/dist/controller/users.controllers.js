"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUserCtrl = exports.loginUser = exports.postUserCtrl = exports.putUserCtrl = exports.getUserId = exports.getUserCtrl = void 0;
// import User from '../models/users.models'
// import fs from 'fs-extra'
const config_1 = __importDefault(require("../config"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config(config_1.default.cloudinary);
// import dataBase from '../utils/database'
const users_services_1 = require("../services/users.services");
const getUserCtrl = async (_req, res) => {
    try {
        const allUser = await (0, users_services_1.fetchGet)();
        if (allUser)
            res.status(200).json(allUser);
        else
            res.status(404).json({ status: 'not found' });
    }
    catch (error) {
        res.status(400).json({ error: 'Doesnt exist Users' });
    }
};
exports.getUserCtrl = getUserCtrl;
const getUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const userId = await (0, users_services_1.fetchUserId)(id);
        res.status(200).json(userId);
    }
    catch (error) {
        res.status(400).json({ error: 'Doesnt exist user with id ' + id });
    }
};
exports.getUserId = getUserId;
const putUserCtrl = async (req, res) => {
    try {
        const data = await (0, users_services_1.fetchPut)(req.body);
        res.status(201).json({ msg: 'user updated', data });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.putUserCtrl = putUserCtrl;
const patchUserCtrl = async (req, res) => {
    try {
        const id = req.params.id;
        const { typeIdentification, phoneNumber, email, address, password } = req.body;
        const data = {};
        if (typeIdentification)
            data.typeIdentification = typeIdentification;
        if (phoneNumber)
            data.phoneNumber = phoneNumber;
        if (email)
            data.email = email;
        if (address)
            data.address = address;
        if (password)
            data.password = password;
        const userModified = await (0, users_services_1.fetchUpdate)(id, data);
        res.status(200).json({ msg: `User with id: ${id} edited succesfully`, userModified });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.patchUserCtrl = patchUserCtrl;
const postUserCtrl = async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            const { ...userData } = req.body;
            const link = 'https://res.cloudinary.com/dnautzk6f/image/upload/v1684479601/User-Pigmeo_ucusuy.jpg';
            const data = await (0, users_services_1.fetchPost)({ ...userData, avatar: link });
            res.status(201).json({ msg: 'User created succeful', data });
        }
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.postUserCtrl = postUserCtrl;
const loginUser = async (req, res) => {
    try {
        const { password, email } = req.body;
        const data = await (0, users_services_1.fetchLogin)(password, email);
        res.status(201).json({ msg: 'User login succeful', data });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error });
    }
};
exports.loginUser = loginUser;
