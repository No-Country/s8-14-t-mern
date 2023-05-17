import { Router } from 'express'
import {
  getUserCtrl,
  postUserCtrl,
  loginUser
} from '../controller/users.controllers'

const router = Router()

router.route('/').get(getUserCtrl)

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
