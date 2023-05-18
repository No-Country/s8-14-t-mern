import { Router } from 'express'
import { getUserCtrl, getUserId, putUserCtrl, postUserCtrl, loginUser } from '../controller/users.controllers'


const router = Router()

router.route('/').get(getUserCtrl)

router.get('/:id', getUserId)

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
