/** Express router providing user related routes
 * @module routers/users
 * @requires Express
 */
import { Router } from 'express'
import {
  deleteUserCtrl,
  forgotPasswordCtrl,
  getUserCtrl,
  getUserIdCtrl,
  loginUser,
  newPswCtrl,
  patchUserCtrl,
  postUserCtrl,
  putImage,
  putUserCtrl,
  verifyTokenPswCtrl,
  verifyUserCtrl
} from '../controller/users.controllers'
import { checkUserEmail, verifyToken } from '../middlewares'
import {
  validatorLogin,
  validatorRegister,
  validatorTokenAccount,
  validatorUserId
} from '../middlewares/validations'

/**
 * Express router on:
 * @namespace users.routes
 */
const router = Router()

router.post('/login', validatorLogin, loginUser)
router.post('/register', validatorRegister, postUserCtrl)

router.get('/confirm/:token', validatorTokenAccount, verifyUserCtrl)
//forgot psw
router.post('/forgot-password', checkUserEmail, forgotPasswordCtrl)
//reset psw
router
  .route('/reset-password/:token')
  .get(validatorTokenAccount, verifyTokenPswCtrl)
  .post(validatorTokenAccount, newPswCtrl)

//TODO: middleware para que solo vea el admin todos los usuarios
router.route('/').get(getUserCtrl)

router
  .route('/:id')
  .get([verifyToken, validatorUserId], getUserIdCtrl)
  .delete([verifyToken, validatorUserId], deleteUserCtrl)

router.put('/edit', putUserCtrl)

router.route('/:id').patch(patchUserCtrl)

router.put('/:id/image', putImage)

export { router }
