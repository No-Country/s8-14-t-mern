"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const users_controllers_1 = require("../controller/users.controllers");
// import { verifyToken } from '../middlewares/authMiddleware'
const router = (0, express_1.Router)();
exports.router = router;
router.route('/').get(users_controllers_1.getUserCtrl);
router.get('/:id', users_controllers_1.getUserId);
router.put('/edit', users_controllers_1.putUserCtrl);
//TODO: Realizar el controlador y service
// router.put('/delete/:id',verifyToken)
router.post('/register', users_controllers_1.postUserCtrl);
router.post('/login', users_controllers_1.loginUser);
//TODO: hacer ruta findById para user
router.route('/:id')
    .patch(users_controllers_1.patchUserCtrl);
