import { Router } from 'express'
import {
  getUserCtrl,
  getUserId,
  putUserCtrl,
  postUserCtrl,
  loginUser
} from '../controller/users.controllers'
// import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

router.route('/').get(getUserCtrl)

router.get('/:id', getUserId)

router.put('/edit', putUserCtrl)

//TODO:
// router.put('/delete/:id',verifyToken)

router.post('/register', postUserCtrl)

router.post('/login', loginUser)

//TODO: hacer ruta findById para user

// .put(...)
// .post(...)

//TODO:
/*
	/login
	/register
*/

export { router }
