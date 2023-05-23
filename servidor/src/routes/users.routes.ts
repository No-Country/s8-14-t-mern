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

/**
 * Rutas del usuario
 */
const router = Router()

router.route('/').get(getUserCtrl)

router.route('/:id').get(checkUser, getUserId).delete(checkUser, deleteUserCtrl)

router.put('/edit', putUserCtrl)

//TODO: Realizar el controlador y service
// router.put('/delete/:id',verifyToken)

router.post('/login', validatorLogin, loginUser)
router.post('/register', validatorRegister, postUserCtrl)
router.get('/confirm/:token', validatorTokenAccount, verifyUserCtrl)
//forgot psw
router.post('/forgot-password', forgotPasswordCtrl)
//reset psw
router
  .route('/reset-password/:token')
  .get(validatorTokenAccount, verifyTokenPswCtrl)
  .post(validatorTokenAccount, newPswCtrl)

//TODO: hacer ruta findById para user

router.route('/:id').patch(patchUserCtrl)

export { router }
