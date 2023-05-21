import { Router } from 'express'
import {
  deleteUserCtrl,
  getUserCtrl,
  getUserId,
  loginUser,
  patchUserCtrl,
  postUserCtrl,
  putUserCtrl
} from '../controller/users.controllers'
import { checkUser } from '../middlewares/validations'
// import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

router.route('/').get(getUserCtrl)

router.route('/:id').get(checkUser, getUserId).delete(checkUser, deleteUserCtrl)

router.put('/edit', putUserCtrl)

//TODO: Realizar el controlador y service
// router.put('/delete/:id',verifyToken)

router.post('/register', postUserCtrl)

router.post('/login', loginUser)

//TODO: hacer ruta findById para user

router.route('/:id').patch(patchUserCtrl)
// .put(...)
// .post(...)

//TODO:
/*
	/login
	/register
*/

export { router }
