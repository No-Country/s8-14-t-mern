import { Router } from 'express'
import { getUserCtrl, putUserCtrl, postUserCtrl } from '../controller/users.controllers'

const router = Router()

router.route('/')

router.get('/users', getUserCtrl)

router.put('/edit', putUserCtrl)

router.post('/register', postUserCtrl)

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
