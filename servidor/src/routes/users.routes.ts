import { Router } from 'express'
import {
  getUserCtrl,
  getUserId,
  putUserCtrl,
  postUserCtrl,
  loginUser,
  patchUserCtrl,
  putImage
} from '../controller/users.controllers'
// import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

router.route('/').get(getUserCtrl)

router.get('/:id', getUserId)

router.put('/edit', putUserCtrl)

//TODO: Realizar el controlador y service
// router.put('/delete/:id',verifyToken)

router.post('/register', postUserCtrl)

router.post('/login', loginUser)

//TODO: hacer ruta findById para user

router.route('/:id')
  .patch(patchUserCtrl)
// .put(...)
// .post(...)

router.put('/:id/image', putImage)
//TODO:
/*
	/login
	/register
*/

export { router }
