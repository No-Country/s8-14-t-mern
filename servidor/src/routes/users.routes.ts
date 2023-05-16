import { Router } from 'express'
import { getUserCtrl, postUserCtrl } from '../controller/users.controllers'

const router = Router()

router.route('/').get(getUserCtrl)

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
