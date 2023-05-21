import { Router } from 'express'
import {
  deleteUserCtrl,
  getUserCtrl,
  getUserId,
  loginUser,
  postUserCtrl,
  putUserCtrl
} from '../controller/users.controllers'
import { checkUser } from '../middlewares/validations'

const router = Router()

router.route('/').get(getUserCtrl)

router.route('/:id').get(checkUser, getUserId).delete(checkUser, deleteUserCtrl)

router.put('/edit', putUserCtrl)

router.post('/register', postUserCtrl)

router.post('/login', loginUser)

//TODO: hacer ruta findById para user

// put - delete
// router.route('/:id')
// .put(...)
// .post(...)

//TODO:
/*
	/login
	/register
*/

export { router }
