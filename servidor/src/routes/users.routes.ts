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

router.route('/').get(getUserCtrl)

router.route('/:id').get(checkUser, getUserId).delete(checkUser, deleteUserCtrl)

router.put('/edit', putUserCtrl)

router.route('/:id').patch(patchUserCtrl)

router.put('/:id/image', putImage)

export { router }
