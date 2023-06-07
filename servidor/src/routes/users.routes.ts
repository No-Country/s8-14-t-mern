/** Express router providing user related routes
 * @module routers/users
 * @requires Express
 */
import { Router } from 'express'
import {
  deleteUserCtrl,
  forgotPasswordCtrl,
  getUserCardsCtrl,
  getUserCtrl,
  getUserIdCtrl,
  loginUser,
  newPswCtrl,
  patchUserCtrl,
  postCardUserCtrl,
  postUserCtrl,
  putImage,
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
//TODO: Agregar en los Get de user
//TODO: agregar validacion para no dejar ingresar un mail invalido.
//TODO: en login agregar imagen y balance al loguearse
//TODO: agregar verificacion que este activo, sino no deja loguearse
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

router.get('/', [verifyToken], getUserCtrl)

router
  .route('/:id')
  .get([verifyToken, validatorUserId], getUserIdCtrl)
  .delete([verifyToken, validatorUserId], deleteUserCtrl)
  .patch(patchUserCtrl)

router.put('/:id/image', putImage)
router.post('/:id/card', postCardUserCtrl)
router.get('/:id/card/:idCard', getUserCardsCtrl)

export { router }
