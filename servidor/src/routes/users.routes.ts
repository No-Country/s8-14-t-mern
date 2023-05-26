import { Router } from 'express'
import {
  deleteUserCtrl,
  forgotPasswordCtrl,
  getUserCtrl,
  getUserId,
  loginUser,
  newPswCtrl,
  patchUserCtrl,
  postUserCtrl,
  putImage,
  putUserCtrl,
  verifyTokenPswCtrl,
  verifyUserCtrl
} from '../controller/users.controllers'
import {
  checkUser,
  validatorLogin,
  validatorRegister,
  validatorTokenAccount
} from '../middlewares/validations'

const router = Router()
//TODO: Agregar en los Get de user
//"address": "Pablo.swistoniuk.Pigmeo",
//"email": "antonio.ayola.cortes@gmail.com"
//"phoneNumber": "(52)5522222222",
//"typeIdentification": "dni"
//TODO: agregar validacion para no dejar ingresar un mail invalido.
//TODO: en login agregar imagen y balance al loguearse
//TODO: agregar verificacion que este activo, sino no deja loguearse
router.post('/login', validatorLogin, loginUser)
router.post('/register', validatorRegister, postUserCtrl)
router.get('/confirm/:token', validatorTokenAccount, verifyUserCtrl)
//forgot psw
//TODO: validad que el mail exista o enviar error
router.post('/forgot-password', forgotPasswordCtrl)
//reset psw
router
  .route('/reset-password/:token')
  .get(validatorTokenAccount, verifyTokenPswCtrl)
  .post(validatorTokenAccount, newPswCtrl)

router.route('/').get(getUserCtrl)

router.route('/:id').get(checkUser, getUserId).delete(checkUser, deleteUserCtrl)

router.put('/edit', putUserCtrl)

router.route('/:id').patch(patchUserCtrl)

router.put('/:id/image', putImage)

export { router }
